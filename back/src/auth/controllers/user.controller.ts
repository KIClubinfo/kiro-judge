import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('campaigns')
export class UserController {
  constructor(private readonly campaignService: UserService) {}

  @Get()
  async findAll() {
    return this.campaignService.findAll();
  }
}
