import { Extensao } from "src/app/pages/extensao/components/model/extensao"

export interface Professor {
    idProfessor?: number
    nome: string
    email: string
    turmaBootcamp?: [{}]
    habilidadeTecnica?: [{}]
    bootcamp?: {}
    extensao?: Extensao
}