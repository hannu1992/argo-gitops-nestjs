import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const version = process.env.IMAGE_TAG || 'local';
    return `NestJS GitOps deployment successful! Version: ${version}`;
  }
}
