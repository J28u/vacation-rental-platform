import { RegisterDto } from './register.dto';
import { OmitType } from '@nestjs/swagger';

export class LoginDto extends OmitType(RegisterDto, ['name'] as const) {}
