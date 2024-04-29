import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) { }

  async create(createUserDto: CreateUserDto) {

      const saltValue = await bcrypt.genSalt(10);
      createUserDto.password = await bcrypt.hash(createUserDto.password, saltValue)      
          
      const user = this.userRepository.create(createUserDto);

      return await this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

}
