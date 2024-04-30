import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
    private redisService: RedisService,
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

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const user = (await this.userRepository.findBy({
      username: signInDto.username,
    }))[0]


    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );
   
    if (!isPasswordMatch) {
      throw new UnauthorizedException ('Invalid password');
    }

    return await this.generateAccessToken(user);
  }

  async signOut(userId: string): Promise<void> {
    // this.redisService.delete(`user-${userId}`);
  }

  async generateAccessToken(user: Partial<SignInDto>,): Promise<{ access_token: string }> {
    
    const payload = { id: user.id, username: user.username };

    const token = await this.jwtService.signAsync(payload);
    
    const stringId = user.id.toString()
    
    await this.redisService.insert(stringId, token);

    return {  access_token: token  };
  }

}
