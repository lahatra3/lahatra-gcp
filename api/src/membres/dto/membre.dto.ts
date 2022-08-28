import { ApiProperty } from "@nestjs/swagger";

export class MembreDto {
    id: number;
    nom: string;
    prenoms: string;
    groupe: string;
    theme: string;
    planning: Date;
}

export class MembreCreateDto {
    @ApiProperty()
    nom!: string;

    @ApiProperty()
    prenoms!: string;

    @ApiProperty()
    groupe!: string;

    @ApiProperty()
    theme!: string;

    @ApiProperty()
    planning!: Date;
}

export class MembreUpdateDto {
    @ApiProperty()
    nom!: string;

    @ApiProperty()
    prenoms!: string;

    @ApiProperty()
    groupe!: string;

    @ApiProperty()
    theme!: string;

    @ApiProperty()
    planning!: Date;
}
