import { Bootcamp } from "./bootcamps"
import { Professores } from "./professores"

export interface Boot {
    idTurmaBootcamp?: any
    nome: string
    dataInicio: string
    dataTermino: string
    bootcamp?: Bootcamp
    status: string
    professores?: Professores[]

  }