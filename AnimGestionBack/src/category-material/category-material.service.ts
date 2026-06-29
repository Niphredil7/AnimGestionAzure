import { Injectable } from '@nestjs/common';
import { CreateCategoryMaterialDto } from './dto/create-category-material.dto';
import { UpdateCategoryMaterialDto } from './dto/update-category-material.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CategoryMaterial } from '@prisma/client';


@Injectable()
export class CategoryMaterialService {
  constructor(private readonly prisma: PrismaService) {}

async create(body: CreateCategoryMaterialDto): Promise<CategoryMaterial> {
  const { existingMaterialIds = [], newMaterials = [], ...categoryData } = body;

  const category = await this.prisma.categoryMaterial.create({
    data: {
      ...categoryData,
    },
  });

  for (const materialId of existingMaterialIds) {
    await this.prisma.categoryHasMaterial.create({
      data: {
        categoryMaterialId: category.id,
        materialId,
      },
    });
  }

  for (const material of newMaterials) {
    const createdMaterial = await this.prisma.material.create({
      data: {
        name: material.name,
      },
    });

    await this.prisma.categoryHasMaterial.create({
      data: {
        categoryMaterialId: category.id,
        materialId: createdMaterial.id,
      },
    });
  }

  return category;
}

  async findAll(): Promise<CategoryMaterial[]> {
    return await this.prisma.categoryMaterial.findMany();
  }

  async findOne(id: string): Promise<CategoryMaterial | null> {
    return await this.prisma.categoryMaterial.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<CategoryMaterial | null> {
    return await this.prisma.categoryMaterial.findFirst({
      where: { name },
    });
  }

  async update(
    id: string,
    body: UpdateCategoryMaterialDto,
  ): Promise<CategoryMaterial> {
    return await this.prisma.categoryMaterial.update({
      where: { id },
      data: {
        ...body,
      },
    });
  }

  async remove(id: string): Promise<CategoryMaterial> {
    return await this.prisma.categoryMaterial.delete({
      where: { id },
    });
  }
}
