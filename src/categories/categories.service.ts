import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.prismaService.category.findMany();
  }

  async findOne(id: number) {
    return this.prismaService.category.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    return this.prismaService.category.delete({
      where: { id },
    });
  }
}
