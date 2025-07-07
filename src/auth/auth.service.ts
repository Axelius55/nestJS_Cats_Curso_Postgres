import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDTO } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    const user = await this.usersService.findOneByEmail(registerDTO.userEmail);
    if (user) {
      throw new BadRequestException('user already exists');
    }
    registerDTO.userPassword = await bcrypt.hash(registerDTO.userPassword, 5);
    await this.usersService.create(registerDTO);
    return {
      userEmail: registerDTO.userEmail,
      userName: registerDTO.userName,
    };
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.usersService.findByEmailWithPassword(
      loginDTO.userEmail,
    );
    if (!user) {
      throw new UnauthorizedException('email not found');
    }
    const passwordValid = await bcrypt.compare(
      loginDTO.userPassword,
      user.userPassword,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('passwords do not match');
    }

    const payload = { email: user.userEmail, role: user.userRole };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email: payload.email,
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    const user = await this.usersService.findOneByEmail(email);
    //if (role !== 'admin') {
    //  throw new UnauthorizedException('user not Unauthorized');
    //}
    return {
      email: email,
      name: user?.userName,
      ID: user?.userID,
      role: role,
    };
  }
}
