import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as fs from "fs";
import { MembreCreateDto, MembreDto, MembreUpdateDto } from './dto/membre.dto';
import { DatabaseDto, DataUserDto } from 'src/app.dto';
import * as database from '../database/data.json';

@Injectable()
export class MembresService {
    private dataUsers: DataUserDto[];
    constructor() {
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

    async findAll(): Promise<MembreDto[]> {
        return this.dataUsers;
    }

    async findOne(id: number ): Promise<MembreDto> {
        return this.dataUsers.find((element: DataUserDto) => element.id === id);
    }

    async create(donnees: MembreCreateDto): Promise<void> {
        const verifyMembre: DataUserDto[] = this.dataUsers.filter((element: DataUserDto) => 
            element.nom === donnees.nom && 
            element.prenoms === donnees.prenoms);
            console.log(verifyMembre.length);
        if(verifyMembre.length !== 0)
            throw new NotAcceptableException("Credentials incorrects !");

        const membre = {
            id: +this.dataUsers[this.dataUsers.length - 1].id + 1,
            ...donnees
        };
        this.dataUsers.push(membre);
        fs.writeFileSync('src/database/data.json', JSON.stringify(this.dataUsers, null, " "));
    }

    async update(id: number, donnees: MembreUpdateDto): Promise<void> {
        this.dataUsers.forEach((element: DataUserDto) => {
            if(element.id === id) {
                element.nom = donnees.nom,
                element.prenoms = donnees.prenoms,
                element.groupe = donnees.groupe,
                element.theme = donnees.theme,
                element.planning = donnees.planning
            }
        });
        fs.writeFileSync('src/database/data.json', JSON.stringify(this.dataUsers, null, " "));
    }

    async delete(id: number): Promise<void> {
        const newdatabase = this.dataUsers.filter((element: DataUserDto) => element.id !== id);
        fs.writeFileSync('src/database/data.json', JSON.stringify(newdatabase, null, " "));
    }
}
