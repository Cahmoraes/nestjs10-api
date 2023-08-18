import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Injectable()
export class VideosService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVideoDto: CreateVideoDto & { file: Express.Multer.File }) {
    const categoryExists = await this.categoryExists(
      createVideoDto.category_id,
    );

    if (!categoryExists) {
      throw new InvalidRelationError('Category not found');
    }

    return this.prismaService.video.create({
      data: {
        title: createVideoDto.title,
        description: createVideoDto.description,
        category_id: createVideoDto.category_id,
        file_path: createVideoDto.file.path,
      },
    });
  }

  private async categoryExists(anId: number): Promise<boolean> {
    const categoryQuantity = await this.categoryQuantityById(anId);
    return categoryQuantity > 0;
  }

  private async categoryQuantityById(anId: number) {
    return this.prismaService.category.count({
      where: {
        id: anId,
      },
    });
  }

  async findAll() {
    return this.prismaService.video.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.video.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  async remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
