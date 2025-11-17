import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
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

  async findUserByCredential(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password); // user.password è hashata

    if (!isValid) {
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
