import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailService } from '../mail/mail.service';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const codeValidator = crypto.randomUUID();
    console.log(codeValidator); // '398de222-5bf9-4754-8e3e-011a55307014'

    const user = await this.prisma.user.create({
      data: {
        customerId: uuidv4(),
        username: createUserDto.username,
        password: hashedPassword,
        email: createUserDto.email,
        codeValidator: codeValidator,
      },
    });

    if (!user) {
      throw new BadRequestException('User not created');
    }

    if (createUserDto.email && createUserDto.email.trim() !== '') {
      await this.mailService.sendTestEmail(createUserDto.email, codeValidator);
    }

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findUserByCredential(username: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });

    console.log(user);
    if (!user) {
      return null;
    }

    return user;
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }

  async removeAll() {
    return this.prisma.user.deleteMany();
  }

  async updateRefreshToken(id: number, refreshToken: string | null) {
    await this.prisma.user.update({ where: { id }, data: { refreshToken } });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
