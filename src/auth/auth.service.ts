import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findUserByCredential(
      username,
      password,
    );
    if (!user) throw new UnauthorizedException('User not found');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      throw new UnauthorizedException('Invalid credentials');

    return this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const payload = { sub: user.id, username: user.username };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    // Salviamo l’hash del refresh token nel DB
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(user.id, hashedRefresh);

    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      const user = await this.usersService.findById(payload.sub);

      if (!user) throw new UnauthorizedException('User not found');
      if (!user.refreshToken)
        throw new UnauthorizedException('No refresh token stored');
      const isValid = await bcrypt.compare(token, user.refreshToken);
      if (!isValid) throw new UnauthorizedException();

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: number) {
    return this.usersService.updateRefreshToken(userId, null);
  }
}
