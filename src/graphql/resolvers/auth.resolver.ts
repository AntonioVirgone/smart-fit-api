import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { AuthTokensModel, UserModel } from '../models/gql-types';
import { LoginInput, RefreshTokenInput } from '../inputs/graphql-inputs';
import { GqlAuthGuard } from '../../auth/guard/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => AuthTokensModel)
  login(@Args('credentials') credentials: LoginInput) {
    return this.authService.login(credentials.username, credentials.password);
  }

  @Mutation(() => AuthTokensModel)
  refreshToken(@Args('payload') payload: RefreshTokenInput) {
    return this.authService.refreshToken(payload.refreshToken);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async logout(@Context('req') req: any) {
    await this.authService.logout(req.user.sub);
    return true;
  }

  @Query(() => UserModel)
  @UseGuards(GqlAuthGuard)
  async me(@Context('req') req: any) {
    return this.usersService.findById(req.user.sub);
  }
}
