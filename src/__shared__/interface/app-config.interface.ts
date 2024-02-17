import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface AppConfig {
  port: number;
  env: any;
  url: string;
  database?: TypeOrmModuleOptions;
  allowedOrigins?: string[];
}
export default AppConfig;
