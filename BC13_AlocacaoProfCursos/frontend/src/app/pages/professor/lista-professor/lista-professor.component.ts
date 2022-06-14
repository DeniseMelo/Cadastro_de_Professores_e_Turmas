import { Component, OnInit, ViewChild } from '@angular/core';
import { Professor } from '../professor';
import { ProfessorHttpService } from '../services/professor-http.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogProfessorComponent } from '../dialog-detalhes-profs/dialog-detalhes-profs.component';



@Component({
  selector: 'app-lista-professor',
  templateUrl: './lista-professor.component.html',
  styleUrls: ['./lista-professor.component.css']
})
export class ListaProfessorComponent implements OnInit {

  professores: Professor[] = []

  dataSource = new MatTableDataSource(this.professores);

  displayedColumns: string[] = ['idProfessor','nome', 'email', 'carreira', 'editar', 'excluir', 'ver'];
 
  @ViewChild(MatPaginator) paginator: any;

  
  constructor(
    private funHttpService: ProfessorHttpService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.recoverProfessores()
  }

  confirmationDelete(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent)

    dialogRef.afterClosed().subscribe(
      canDelete => {
        if (canDelete) {
          this.funHttpService.excluirProfessor(id).subscribe(
            () => {
              this.snackbar.open('Extensão deletada!', 'Ok', {
                duration: 3000,
                horizontalPosition: 'left',
                verticalPosition: 'top'
              })
              this.recoverProfessores()
            }
          )
        }
      }
    )
  }

  recoverProfessores() {
    this.funHttpService.mostrarTodosProfessores().subscribe(
      (professores) => {
        this.professores = professores
        console.log(professores)
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

  }

  detalhesProfessorDialog(idProfessor: number){
    const ref = this.dialog.open(DialogProfessorComponent)

    ref.componentInstance.idProfessor = idProfessor;
  }
}