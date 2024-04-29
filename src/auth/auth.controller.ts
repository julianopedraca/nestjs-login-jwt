import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('sing-up')
  public async singUp(@Body() signUpDto: SignUpDto){
      return this.authService.signUp(signUpDto);
  }

  // @Post('sing-in')
  // public async signIn(@Body() signInDto: SignInDto){
  //     return this.authService.signIn(signInDto);
  // }

}
