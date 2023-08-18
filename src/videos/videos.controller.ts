import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  ParseFilePipe,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import {
  CreateVideoDto,
  CresteVideoWithUploadDto,
} from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoFileValidator } from './video-file.validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { VideoSerializer } from './video.serializer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@UseInterceptors(FileInterceptor('file'))
@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CresteVideoWithUploadDto,
  })
  @Post()
  create(
    @Body() createVideoDto: CreateVideoDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new VideoFileValidator({
            maxSize: 100 * 1024 * 1024,
            mimetype: 'video/mp4',
          }),
        ],
        errorHttpStatusCode: 422,
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return this.videosService.create({
      ...createVideoDto,
      file,
    });
  }

  @Get()
  async findAll() {
    const videos = await this.videosService.findAll();
    return videos.map((video) => new VideoSerializer(video));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }

  @Get('file/:file')
  async file(@Param('file') file: string, @Res() res: Response) {
    console.log(process.cwd());
    console.log(__dirname);
    const fileStream = createReadStream(join(process.cwd(), 'upload', file));
    fileStream.pipe(res);
  }
}
