import { Category, Video } from '@prisma/client';
import { basename } from 'path';

export class VideoSerializer {
  id: number;
  title: string;
  description: string;
  category: {
    id: number;
    name: string;
    description: string;
  };
  file_url: string;

  constructor(aVideo: Video & { category: Category }) {
    this.id = aVideo.id;
    this.title = aVideo.title;
    this.description = aVideo.description;
    this.category = aVideo.category;
    this.file_url =
      'http://localhost:3000/videos/file' + basename(aVideo.file_path);
  }
}
