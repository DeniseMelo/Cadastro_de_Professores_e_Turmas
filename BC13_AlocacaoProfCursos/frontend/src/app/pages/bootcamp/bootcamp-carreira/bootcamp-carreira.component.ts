import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BootcampService } from 'src/app/services/bootcamp.service';
import { Bootcamp } from '../bootcamps';

@Component({
  selector: 'app-bootcamp-carreira',
  templateUrl: './bootcamp-carreira.component.html',
  styleUrls: ['./bootcamp-carreira.component.css']
})
export class BootcampCarreiraComponent {
 
 
  idBootcamp?:any
 
 

  formCadastro: FormGroup = this.fb.group({
    nome:['', [Validators.required, Validators.minLength(4)]],
    dataInicio: [''],
    dataTermino: [''],
   
})
 


  constructor(
   
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private boot:BootcampService,
    private router: Router
    ) { }

  ngOnInit(): void {}

   

 submit() {
    const dadosCarreira = {
      nome:this.formCadastro.value.nome,
      duracao: this.formCadastro.value.duracao,
      duracaoProjetoFinal:this.formCadastro.value.duracaoProjetoFinal,
     
    }
      this.boot.inserirBootcamp(dadosCarreira).subscribe(
        (bootcamp: any) => {
          this.formCadastro = bootcamp;
          console.log(this.formCadastro)
          this.router.navigateByUrl("/bootcamp")
        }
      )


    console.log()
      this.boot.inserirBootcamp(dadosCarreira)


      this.router.navigateByUrl('/bootcamp');
    
  }
 
}


