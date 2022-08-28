import { Body, Controller, Delete, Get, NotAcceptableException, 
    Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MembreCreateDto, MembreDto, 
    MembreUpdateDto } from './dto/membre.dto';
import { MembresService } from './membres.service';

@ApiBearerAuth()
@Controller('membres')
export class MembresController {
    constructor(
        private readonly membresService: MembresService
    ) {}

    @UseGuards(AuthGuard('jwt_gcp'))
    @Get()
    async getMembres(): Promise<MembreDto[]> {
       return await this.membresService.findAll(); 
    }

    @UseGuards(AuthGuard('jwt_gcp'))
    @Get("id")
    async getMembreById(@Request() req: any) {
        return await this.membresService.findOne(parseInt(req.user.id));
    }

    @UseGuards(AuthGuard('jwt_gcp'))
    @Post("create")
    async createMembres(@Body() donnees: MembreCreateDto) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.membresService.create(donnees);
    }

    @UseGuards(AuthGuard('jwt_gcp'))
    @Put("update")
    async updateMembres(@Body() donnees: MembreUpdateDto, @Request() req: any) {
        if(!donnees) throw new NotAcceptableException("Credentials incorrects !");
        return await this.membresService.update(parseInt(req.user.id), donnees);
    }

    @UseGuards(AuthGuard('jwt_gcp'))
    @Delete("delete")
    async deleleMembres(@Request() req: any) {
        return await this.membresService.delete(parseInt(req.user.id));
    }
}
