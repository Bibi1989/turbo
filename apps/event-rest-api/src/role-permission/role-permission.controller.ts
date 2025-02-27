import { Body, Controller, Post } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { CreateRoleDto } from './dto/role.dto';

@Controller()
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Post('/role')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolePermissionService.createRole(createRoleDto);
  }
}
