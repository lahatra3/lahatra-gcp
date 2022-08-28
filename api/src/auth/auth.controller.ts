import { Body, Controller, NotAcceptableException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post()
    async login(@Body() donnees: AuthDto) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.authService.authentifier(donnees);
    }
}
