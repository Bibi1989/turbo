import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Public } from '../decorators/public.decorator';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() userInput: RegisterDto) {
    return await this.authService.register(userInput);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return req.user;
  }

  @Get('/all')
  async getAll() {
    return await this.authService.findAll();
  }

  @Get('/profile')
  async getUser(@Request() req) {
    const { id } = req.user;
    return await this.authService.getUser(id);
  }

  @Put('/assign-role')
  async assignRole(@Param('id') id: string, @Body() body) {
    return await this.authService.assignRole(id, body.roleId);
  }
}
