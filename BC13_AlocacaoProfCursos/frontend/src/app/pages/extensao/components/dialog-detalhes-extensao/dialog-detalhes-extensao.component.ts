import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/auth/models/professor';
import { ExtensaoService } from 'src/app/services/extensao.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { Extensao } from '../model/extensao';

@Component({
  selector: 'app-dialog-detalhes-extensao',
  templateUrl: './dialog-detalhes-extensao.component.html',
  styleUrls: ['./dialog-detalhes-extensao.component.css']
})
export class DialogDetalhesExtensaoComponent implements OnInit {

  professores: Professor[] = []
  idExtensao!: number;
  extensao!: Extensao

  
  constructor(
    private profService: ProfessorService,
    private extensaoService: ExtensaoService 
  ) { }

  ngOnInit(): void {

    this.buscarPofessorPorExtensao(this.idExtensao);
    this.buscarExtensao(this.idExtensao)
  }


  buscarPofessorPorExtensao(idExtensao: number){ 
    this.profService.getProfessoresPorExtensao(idExtensao).subscribe(
      (professores) => {
        this.professores = professores
      }
    )
  }

  buscarExtensao(idExtensao: number){
    this.extensaoService.getExtensaoById(idExtensao).subscribe(
      (extensao) => {
        this.extensao = extensao
      }
    )
  }

}
