import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';
import { IsNumber, IsString } from 'class-validator';

export class SignInDto {
    
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    username: string;

    @IsString()
    @ApiProperty()
    password: string;

}
