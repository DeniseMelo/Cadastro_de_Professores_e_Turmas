import { Professor } from "../auth/models/professor"

export interface HABILIDADESTECNICAS{
    idHabilidadeTecnica: number
    nome: String
    professores: Professor[]
}