import { Controller, ForbiddenException, Get, NotFoundException, Param, Response, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Instance } from '../entities/instance.entity';
import { InstanceService } from '../services/instance.service';
import { Loader } from '../evaluation/loader';

@Controller('instances')
@UseGuards(AuthGuard('jwt'))
export class InstanceController {
  constructor(private readonly instanceService: InstanceService) {}

  @Get(':id/download')
  async download(@Param('id') id, @Response() response) {
    let instance: Instance;
    try {
      instance = await this.instanceService.findOne(id);
    } catch (e) {
      throw new NotFoundException(e);
    }

    if (new Date() < instance.competition.startDate) {
      throw new ForbiddenException();
    }

    response.download(Loader.getInstancePath(instance.filename));
  }
}
