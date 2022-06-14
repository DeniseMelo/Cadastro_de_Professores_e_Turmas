import { Bootcamp } from "src/app/models/bootcamp"
import { HABILIDADESTECNICAS } from "src/app/models/habilidadeTecnicas"
import { TurmaBootcamp } from "src/app/models/turmaBootcamp"
import { Extensao } from "../extensao/components/model/extensao"

export interface Professor {
    idProfessor?: number
    nome: string
    email: string
    habilidadeTecnica?: HABILIDADESTECNICAS[]
    bootcamp?: Bootcamp
    extensao?: Extensao
    turmaBootcamp?: TurmaBootcamp[]
}
