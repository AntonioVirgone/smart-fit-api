import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    console.log('******** create new user ********');
    console.log(createUserDto.password);
    console.log(hashedPassword);

    const newUser = this.userRepository.create({
      customerId: uuidv4(),
      username: createUserDto.username,
      password: hashedPassword,
      email: createUserDto.email,
    });

    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findUserByCredential(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    console.log(user);
    if (!user) {
      return null;
    }

    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async removeAll() {
    return this.userRepository.deleteAll();
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    await this.userRepository.update(id, { refreshToken });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  async findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
