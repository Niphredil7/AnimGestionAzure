import { Injectable } from '@nestjs/common';
import { CreateCategoryHasMaterialDto } from './dto/create-category-has-material.dto';
import { UpdateCategoryHasMaterialDto } from './dto/update-category-has-material.dto';

@Injectable()
export class CategoryHasMaterialService {
  create(createCategoryHasMaterialDto: CreateCategoryHasMaterialDto) {
    return 'This action adds a new categoryHasMaterial';
  }

  findAll() {
    return `This action returns all categoryHasMaterial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoryHasMaterial`;
  }

  update(id: number, updateCategoryHasMaterialDto: UpdateCategoryHasMaterialDto) {
    return `This action updates a #${id} categoryHasMaterial`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoryHasMaterial`;
  }
}
