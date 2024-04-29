import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<Users> {
    try {
      const saltValue = await bcrypt.genSalt();
      signUpDto.password = await bcrypt.hash(signUpDto.password, saltValue)

      const user = this.userRepository.create(signUpDto);

      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  // async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
  //   const user = (await this.userRepository.findBy({
  //     username: signInDto.username,
  //   }))[0]


  //   if (!user) {
  //     throw new BadRequestException('User not found');
  //   }

  //   console.log("O timpo é:",typeof(signInDto.password));
    
  //   const isPasswordMatch = await bcrypt.compare(
  //     signInDto.password,
  //     user.password,
  //   );
   
  //   if (!isPasswordMatch) {
  //     throw new BadRequestException('Invalid password');
  //   }

  //   return await this.generateAccessToken(user);
  // }

  // async generateAccessToken(user: Partial<SignInDto>,): Promise<{ accessToken: string }> {
  //   const tokenId = randomUUID();

  //   await this.redisService.insert(`user-${user.id}`, tokenId);

  //   const accessToken = await this.jwtService.signAsync(
  //     {
  //       id: user.id,
  //       email: user.email,
  //       tokenId,
  //     } as ActiveUserData,
  //     {
  //       secret: this.jwtConfiguration.secret,
  //       expiresIn: this.jwtConfiguration.accessTokenTtl,
  //     },
  //   );

  //   return { accessToken };
  // }

}
