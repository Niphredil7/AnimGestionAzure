import { Module } from '@nestjs/common';
import { CategoryHasMaterialService } from './category-has-material.service';
import { CategoryHasMaterialController } from './category-has-material.controller';

@Module({
  controllers: [CategoryHasMaterialController],
  providers: [CategoryHasMaterialService],
})
export class CategoryHasMaterialModule {}
