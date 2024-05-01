import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignOutDto } from './dto/sign-out.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('sign-up')
  public async signUp(@Body() signUpDto: SignUpDto){
      return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  public async signIn(@Body() signInDto: SignInDto){
      return this.authService.signIn(signInDto);
  }

  @Post('sign-out')
  public async signOut(@Body() uuid: SignOutDto): Promise<number> {
    return this.authService.signOut(uuid);
  }


}
