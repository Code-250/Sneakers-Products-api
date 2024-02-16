import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
@Injectable()
export class CloudinaryService {
  constructor() {
    v2.config({
      cloud_name: 'dectjcbvr',
      api_key: '947787528557937',
      api_secret: 'M4uKr8ZFE4p466r9tuQ8K6urkkc',
    });
  }
  async uploadImage(
    file: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.upload(file, { folder: 'Sneakers' }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
