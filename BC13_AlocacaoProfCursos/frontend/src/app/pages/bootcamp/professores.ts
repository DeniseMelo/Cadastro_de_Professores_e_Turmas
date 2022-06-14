import { Bootcamp } from "./bootcamps"

export interface Professores {
    idProfessor: any
    nome: string
    email: string
    extensao?: any
    bootcamp?: Bootcamp
  }
