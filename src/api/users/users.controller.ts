import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import {
  UsersCreateDto as CreateSchema,
  UsersQueryDto,
  UserUpdateDto,
  UserUpdatePasswordDto,
} from './users.dto';
import { Request, Response } from 'express';
import { REQUEST } from '@nestjs/core';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OpenApiResponses } from '@/common/decorators/openapi.decorator';
import { RoleGuard } from '@/common/guards/role/role.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(RoleGuard)
@Controller({ version: ['1'], path: 'users' })
export class UsersController {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly service: UsersService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @OpenApiResponses([200, 400, 500])
  async index(
    @Req() req: Request,
    @Query() query: UsersQueryDto,
    @Res() res: Response,
  ) {
    const r = await this.service.index(query);
    res.status(r.statusCode).send(r);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @OpenApiResponses([200, 400, 404, 500])
  async show(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.findOne(id);
    res.status(r.statusCode).send(r);
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new user' })
  @OpenApiResponses([201, 400, 409, 500])
  async store(@Body() body: CreateSchema, @Res() res: Response) {
    const r = await this.service.store(body);
    res.status(r.statusCode).send(r);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @OpenApiResponses([200, 400, 404, 500])
  async update(
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
    @Res() res: Response,
  ) {
    const r = await this.service.update(id, body);
    res.status(r.statusCode).send(r);
  }

  @Patch(':id/change-password')
  @ApiOperation({ summary: 'Change user password by ID' })
  @OpenApiResponses([200, 400, 404, 500])
  async changePassword(
    @Param('id') id: string,
    @Body() body: UserUpdatePasswordDto,
    @Res() res: Response,
  ) {
    const r = await this.service.updatePassword(id, body);
    res.status(r.statusCode).send(r);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string, @Res() res: Response) {
    const r = await this.service.destroy(id);
    res.status(r.statusCode).send(r);
  }
}
