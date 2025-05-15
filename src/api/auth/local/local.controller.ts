import { Body, Controller, Post, Res } from '@nestjs/common';
import { LocalService } from './local.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalSignInDto } from './local.dto';
import { Response } from 'express';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';

@ApiTags('Auth - Local')
@Controller('auth/local')
export class LocalController {
  constructor(private readonly service: LocalService) {}
  @Post('sign-in')
  @ApiOperation({ summary: 'Local Sign In' })
  @OpenApiResponses([200, 400, 404, 500])
  async localSignIn(@Body() body: LocalSignInDto, @Res() res: Response) {
    const r = await this.service.localSignIn(body);
    res.status(r.statusCode).send(r);
  }
}
