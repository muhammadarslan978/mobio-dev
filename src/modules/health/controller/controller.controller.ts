import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get()
  async healthCheck() {
    return { data: 'Backend is up and running' };
  }
}
