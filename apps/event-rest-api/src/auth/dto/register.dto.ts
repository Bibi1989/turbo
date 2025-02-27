import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;
  @IsEmail()
  @IsString()
  email: string;
  @IsString()
  phone?: string;
  @IsString()
  password: string;
  @IsOptional()
  roleId?: string;
}
