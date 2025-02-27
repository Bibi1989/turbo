import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermissionDto } from './dto/permission.dto';
import { CreateRoleDto } from './dto/role.dto';

@Injectable()
export class RolePermissionService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRole(roleInput: CreateRoleDto) {
    return await this.prismaService.role.create({
      data: {
        name: roleInput.name,
      },
    });
  }

  async createPermission(permissionInput: CreatePermissionDto) {
    return await this.prismaService.permission.create({
      data: {
        name: permissionInput.name,
      },
    });
  }

  async findAll() {
    return await this.prismaService.role.findMany();
  }

  async findAllPermissions() {
    return await this.prismaService.permission.findMany();
  }

  async getRole(id: string) {
    return await this.prismaService.role.findUnique({
      where: { id },
    });
  }

  async getPermission(id: string) {
    return await this.prismaService.permission.findUnique({
      where: { id },
    });
  }
}
