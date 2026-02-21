import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const version = process.env.IMAGE_TAG || 'local';
    const env = process.env.NODE_ENV || 'development';

    return `NestJS GitOps deployment successful | env: ${env} | commit: ${version}`;
  }
}
