import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryHasMaterialDto } from './create-category-has-material.dto';

export class UpdateCategoryHasMaterialDto extends PartialType(CreateCategoryHasMaterialDto) {}
