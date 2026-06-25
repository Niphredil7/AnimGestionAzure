import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ChildService } from './child.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { ResponseInterfaceWithData } from 'src/response.interface';
import { IRequestWithPayload } from 'src/auth/interfaces';
import { Child } from '@prisma/client';
import { CustomHttpException } from 'src/utils/custom.exception';
import { ClasseService } from 'src/classe/classe.service';

@Controller('child')
export class ChildController {
  constructor(
    private readonly childService: ChildService,
    private readonly classService: ClasseService,
  ) {}

  @Post()
  async create(
    @Body() body: CreateChildDto,
  ): Promise<ResponseInterfaceWithData<{ newChild: Child }>> {
    return {
      data: { newChild: await this.childService.create(body) },
      message: 'Nouvel enfant créé',
    };
  }

  @Get('/gender')
  async countByGender(): Promise<
    ResponseInterfaceWithData<{ stats: number[] }>
  > {
    return {
      data: { stats: await this.childService.countByGender() },
      message: 'Répartition enfants par sexe',
    };
  }

  @Get('/gender/referent')
  async countByGenderByClass(
    @Req() req: IRequestWithPayload,
  ): Promise<ResponseInterfaceWithData<{ stats: number[] }>> {
    if (!req.user || !req.user.id) {
      // si jamais la route n'est pas protégée par un guard
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    const classe = await this.classService.findByUser(req.user.id);

    if (!classe) {
      throw new NotFoundException('Aucune classe trouvée pour cet utilisateur');
    }

    const stats = await this.childService.countByGenderByClass(classe.id);

    return {
      data: { stats },
      message: 'Répartition enfants par sexe',
    };
  }

  @Get()
  async findAll(): Promise<ResponseInterfaceWithData<{ users: Child[] }>> {
    return {
      data: { users: await this.childService.findAll() },
      message: 'Liste des child',
    };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<{ data: Child; message: string }> {
    const child = await this.childService.findOne(id);
    if (!child)
      throw new CustomHttpException(
        `Enfant ${child} not exist`,
        HttpStatus.BAD_REQUEST,
        'UC-gI-1',
      );
    return { data: child, message: 'Enfants :' };
  }

  @Get('classe/:classId')
  async findByClassId(
    @Param('classId') classId: string,
  ): Promise<ResponseInterfaceWithData<{ children: Child[] }>> {
    const children = await this.childService.findByClassId(classId);
    if (!children || children.length === 0)
      throw new NotFoundException(
        `Aucun enfant trouvé pour la classe ${classId}`,
      );

    return { data: { children }, message: `Enfants de la classe ${classId}` };
  }

  @Get('parent/:parentId')
  async findByParentId(
    @Param('parentId') parentId: string,
  ): Promise<ResponseInterfaceWithData<{ children: Child[] }>> {
    const children = await this.childService.findByParentId(parentId);
    if (!children || children.length === 0)
      throw new NotFoundException(
        `Aucun enfant trouvé pour le parent ${parentId}`,
      );

    return { data: { children }, message: `Enfants du parent ${parentId}` };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateChildDto,
  ): Promise<{ data: Child; message: string }> {
    const user = await this.childService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Child ${id} not exist`);
    }
    const newChild = await this.childService.update(id, body);
    return { data: newChild, message: 'Enfant mis à jour' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.childService.remove(id);
    } catch {
      throw new NotFoundException();
    }
    return { message: "L'enfant a été delete." };
  }
}
