import { Injectable } from '@nestjs/common';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class FileUploadService {
  constructor() {}

  storage = diskStorage({
    destination: './uploads',
    filename: (
      req: any,
      file: { originalname: string },
      callback: (arg0: null, arg1: string) => any,
    ) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return callback(null, `${randomName}${extname(file.originalname)}`);
    },
  });

  multerOptions = {
    storage: this.storage,
  };
}
