import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryMaterialDto } from './create-category-material.dto';

export class UpdateCategoryMaterialDto extends PartialType(
  CreateCategoryMaterialDto,
) {}
