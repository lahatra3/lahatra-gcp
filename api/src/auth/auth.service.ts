import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseDto, DataUserDto } from 'src/app.dto';
import { AuthDto } from './dto/auth.dto';
import * as database from '../database/data.json';

@Injectable()
export class AuthService {
    private dataUsers: DataUserDto[];
    constructor(private jwtService: JwtService) { 
        this.dataUsers = database.map((value: DatabaseDto) => (
            {
                id: value.id,
                nom: value.nom,
                prenoms: value.prenoms,
                groupe: value.groupe,
                theme: value.theme,
                planning: new Date(value.planning)
            }
        ));
    }

    private async signResponse(donnees: DataUserDto): Promise<string> {
        return this.jwtService.signAsync({
            id: donnees.id,
            nom: donnees.nom,
            prenoms: donnees.prenoms
        });
    }

    async authentifier(donnees: AuthDto): Promise<{ access_token: string }> {
        const response: DataUserDto = this.dataUsers.find(element => 
            element.nom === donnees.nom && 
            element.prenoms === donnees.prenoms && 
            element.groupe === donnees.groupe);
        if(!response) throw new UnauthorizedException("Credentials incorrects !");
        return {
            access_token: await this.signResponse(response)
        };
    }
}
