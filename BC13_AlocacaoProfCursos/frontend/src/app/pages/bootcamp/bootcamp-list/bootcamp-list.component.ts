import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



import { BootcampService } from 'src/app/services/bootcamp.service';
import { Boot } from '../boot';
import { BootcampConfirmDialogComponent } from '../bootcamp-confirm-dialog/bootcamp-confirm-dialog.component';
import { Professores } from '../professores';

@Component({
  selector: 'app-bootcamp-list',
  templateUrl: './bootcamp-list.component.html',
  styleUrls: ['./bootcamp-list.component.css']
})
export class BootcampListComponent implements OnInit, AfterViewInit {


  filtrarStatus: Boot[] = []
  ELEMENTE_DATA: Boot[] = []

  professorList!: Professores[]



  displayedColumns: string[] =
    ['id',
      'turma',
      'carreira',
      'dataInicio',
      'dataProjFinal',
      'dataFinal',
      'status',
     ' professores',
      'acoes'
    ];

  dataSource = new MatTableDataSource<Boot>(this.ELEMENTE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(

    private boot: BootcampService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar

  ) { }


ngOnInit(): void {
    this.mostrarTodosBootcamps();
    //this.preencherProfessores()
  }

/* preencherProfessores() {
  this.professorList = this.ELEMENTE_DATA.map(x => { return x.professores[0]})
  console.log(this.professorList)
}
 */
  mostrarTodosBootcamps(): void {
    this.boot.mostrarTodosBootcamps().subscribe((resposta ) => {
      this.ELEMENTE_DATA = resposta;
      this.dataSource = new MatTableDataSource<Boot>(this.ELEMENTE_DATA);
      this.dataSource.paginator = this.paginator;
    })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  status(status: string): any {
    if (status == 'Abertos') {
      return 'Abertos'
    } else if (status == 'Proximos') {
      return 'Proximos'
    } else if (status == 'Encerrados') {
      return 'Encerrados'
    }

  }

  porStatus(status: any): void {
    let list: Boot[] = []
    this.ELEMENTE_DATA.forEach(element => {
      if (element.status == status)
        list.push(element)
    });
    this.filtrarStatus = list;
    this.dataSource = new MatTableDataSource<Boot>(list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

  }

  excluirBootcamp(id: any){
    const dialogRef = this.dialog.open(BootcampConfirmDialogComponent )

    dialogRef.afterClosed().subscribe(canDelete => {
      if (canDelete) {
        this.boot.excluirBootcamp(id).subscribe(() => {
          this.snackbar.open(' deletada!', 'Ok',
            { duration: 3000, horizontalPosition: 'center', verticalPosition: 'bottom' })
            this.mostrarTodosBootcamps()
        })
      }
    })

  }





}

