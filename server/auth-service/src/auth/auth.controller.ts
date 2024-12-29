import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; confirmPassword: string; role?: string },
  ) {
    console.log('Incoming register payload:', body); // Log the payload
    const { email, password, confirmPassword, role } = body;
  
    const user = await this.authService.register(email, password, confirmPassword, role);
  
    console.log('Registered user returned:', user); // Log the saved user
    return user;
  }
  
  
  
  
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
  
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    console.log('User Retrieved:', user); // Log the user details
    const response = await this.authService.login(user);
  
    console.log('Login Response:', response); // Log the response to ensure `role` is included
    return response;
  }
  
  
}
