import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Material } from '@prisma/client';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

async create(body: CreateMaterialDto): Promise<Material> {
    const { category = [], ...materialData } = body;

  const material = await this.prisma.material.create({
    data: materialData,
  });

  if (category.length > 0) {
    await this.prisma.categoryHasMaterial.createMany({
      data: category.map((categoryMaterialId) => ({
        materialId: material.id,
        categoryMaterialId,
      })),
    });
  }

  return material;
}

  //  route relié a des catgéories
  async findAll(): Promise<Material[]> {
    return await this.prisma.material.findMany();
  }

  async findOne(id: string): Promise<Material | null> {
    return await this.prisma.material.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<Material | null> {
    return await this.prisma.material.findFirst({
      where: { name },
    });
  }

  async update(id: string, body: UpdateMaterialDto): Promise<Material> {
    return await this.prisma.material.update({
      where: { id },
      data: {
        ...body,
      },
    });
  }

  async remove(id: string): Promise<Material> {
    return await this.prisma.material.delete({
      where: { id },
    });
  }
}
