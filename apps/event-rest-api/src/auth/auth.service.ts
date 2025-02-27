import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

import {
  TAuthResponse,
  TAuthResponseWithPromise,
  TRoleResponseWithPromise,
} from '@repo/types/dist';

import { PrismaService } from '../prisma/prisma.service';
import { TTokenPayload } from '../types/access-token.type';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private rounds: number = 10;

  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(userInput: RegisterDto): TAuthResponseWithPromise {
    const user = this.prismaService.user.findUnique({
      where: { email: userInput.email },
    });

    if (!user) throw new BadRequestException('This user exist already');

    let role: Role;

    if (!userInput?.roleId) {
      role = await this.prismaService.role.findFirst({
        where: { name: 'USER' },
      });

      if (!role) {
        role = await this.prismaService.role.create({
          data: {
            name: 'USER',
          },
        });
      }
    }

    const password = await this.hash(userInput?.password);

    const createdUser = await this.prismaService.user.create({
      data: {
        email: userInput.email,
        name: userInput.name,
        phone: userInput.phone,
        password,
        roleId: role.id,
      },
      include: {
        role: true,
      },
      omit: {
        password: true,
      },
    });

    const { accessToken } = this.getAccessToken({
      id: createdUser.id,
      email: createdUser.email,
    });

    return {
      ...createdUser,
      accessToken,
    };
  }

  async validateUser(userInput: LoginDto): TAuthResponseWithPromise {
    const userFound = await this.prismaService.user.findUnique({
      where: { email: userInput.email },
      include: {
        role: true,
      },
    });

    const { password, ...user } = userFound;

    if (!userInput.password || !password)
      throw new BadRequestException('Wrong email or password');

    const isMatchPassword = await this.compare(userInput.password, password);

    if (!isMatchPassword)
      throw new BadRequestException('Wrong email or password');

    if (!user) return null;

    const { accessToken } = this.getAccessToken({
      id: user.id,
      email: user.email,
    });

    return {
      ...user,
      accessToken,
    };
  }

  async login(userInput: LoginDto): TAuthResponseWithPromise {
    const user = await this.validateUser(userInput);

    if (!user) throw new BadRequestException('Register your account');

    const { accessToken } = this.getAccessToken({
      id: user.id,
      email: user.email,
    });

    return {
      ...user,
      accessToken,
    };
  }

  async findAll(): Promise<TAuthResponse[]> {
    const users = await this.prismaService.user.findMany();
    return users;
  }

  async getUser(id: string): TAuthResponseWithPromise {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: {
        role: true,
        Events: true,
      },
      omit: {
        password: true,
      },
    });

    const { accessToken } = this.getAccessToken({
      id: user.id,
      email: user.email,
    });

    return {
      ...user,
      accessToken,
    };
  }

  async assignRole(userId: string, roleId: string): TRoleResponseWithPromise {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
      },
      omit: {
        password: true,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        roleId,
      },
    });

    return user;
  }

  getAccessToken(payload: TTokenPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: '7d',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, this.rounds);
  }

  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
}
