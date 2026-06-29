import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryHasMaterialService } from './category-has-material.service';
import { CreateCategoryHasMaterialDto } from './dto/create-category-has-material.dto';
import { UpdateCategoryHasMaterialDto } from './dto/update-category-has-material.dto';

@Controller('category-has-material')
export class CategoryHasMaterialController {
  constructor(private readonly categoryHasMaterialService: CategoryHasMaterialService) {}

  @Post()
  create(@Body() createCategoryHasMaterialDto: CreateCategoryHasMaterialDto) {
    return this.categoryHasMaterialService.create(createCategoryHasMaterialDto);
  }

  @Get()
  findAll() {
    return this.categoryHasMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryHasMaterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryHasMaterialDto: UpdateCategoryHasMaterialDto) {
    return this.categoryHasMaterialService.update(+id, updateCategoryHasMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryHasMaterialService.remove(+id);
  }
}
