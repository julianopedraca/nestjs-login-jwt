import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignOutDto {
    @IsString()
    @ApiProperty()
    uuid: string;
}
