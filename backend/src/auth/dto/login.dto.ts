import { RegisterDto } from './register.dto';
import { OmitType, ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto extends OmitType(RegisterDto, ['name'] as const) {
  @IsString()
  @ApiProperty({ example: "GfyTui0ç6'$42;:1_*" })
  password!: string;
}
