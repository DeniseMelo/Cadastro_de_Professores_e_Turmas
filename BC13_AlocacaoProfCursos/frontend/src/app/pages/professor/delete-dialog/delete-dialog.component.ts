import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfessorHttpService } from '../services/professor-http.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    private funHttpService: ProfessorHttpService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }


  deletarProfessor(idProf: number){
      this.funHttpService.excluirProfessor(idProf).subscribe(
        () => {
          this.snackbar.open('Professor deletado!', 'Ok', {
            duration: 3000,
            horizontalPosition: 'left',
            verticalPosition: 'top'
          })
        }
      )
    }


}
