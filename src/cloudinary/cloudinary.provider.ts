import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dectjcbvr',
      api_key: '947787528557937',
      api_secret: 'M4uKr8ZFE4p466r9tuQ8K6urkkc',
    });
  },
};
