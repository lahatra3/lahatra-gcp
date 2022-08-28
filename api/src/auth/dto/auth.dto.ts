import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
    @ApiProperty()
    nom!: string;

    @ApiProperty()
    prenoms!: string;

    @ApiProperty()
    groupe!: string;
}
