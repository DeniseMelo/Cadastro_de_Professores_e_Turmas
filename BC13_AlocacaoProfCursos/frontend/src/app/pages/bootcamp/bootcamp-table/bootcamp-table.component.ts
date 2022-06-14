import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BootcampService } from 'src/app/services/bootcamp.service';
import { Boot } from '../boot';

import { BootcampConfirmDialogComponent } from '../bootcamp-confirm-dialog/bootcamp-confirm-dialog.component';
import { VisualizarBootcampComponent } from '../visualizar-bootcamp/visualizar-bootcamp.component';


@Component({
  selector: 'app-bootcamp-table',
  templateUrl: './bootcamp-table.component.html',
  styleUrls: ['./bootcamp-table.component.css']
})
export class BootcampTableComponent implements OnInit, AfterViewInit {


  filtrarStatus: Boot[] = []
  ELEMENTE_DATA: Boot[] = []


  displayedColumns: string[] =
    ['id',
      'turma',
      'carreira',
      'dataInicio',
      'dataFinal',
      'status',
      'acoes'
    ];

  dataSource = new MatTableDataSource<Boot>(this.ELEMENTE_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(

    private boot: BootcampService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }


ngOnInit(): void {
    this.mostrarTodosBootcamps();
}

  mostrarTodosBootcamps(): void {
    this.boot.mostrarTodosBootcamps().subscribe((resposta ) => {
      this.ELEMENTE_DATA = resposta;
      console.log(this.ELEMENTE_DATA)
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
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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


  abrirDialog(id: number){

    const DIALOGREF = this.dialog.open(VisualizarBootcampComponent);

    DIALOGREF.componentInstance.id = id;

    DIALOGREF.afterClosed().subscribe(
      (result) => {
        console.log(result)
      }
    )
  }







}
