import { ExtensaoService } from './../../../../services/extensao.service';
import { DeleteDialogExtensaoComponent } from './../delete-dialog-extensao/delete-dialog-extensao.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Extensao } from '../model/extensao';
import { DialogDetalhesExtensaoComponent } from '../dialog-detalhes-extensao/dialog-detalhes-extensao.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements  AfterViewInit {

  ELEMENT_DATA:Extensao[] = []

  displayedColumns: string[] = ['idExtensao', 'nome', 'especialidade', 'dataInicio', 'dataTermino', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Extensao>(this.ELEMENT_DATA);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private extensao: ExtensaoService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getExtensao();
    this.recoverExtensao()
  }

  ngAfterViewInit() {
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

  status(status: string): any {
    if (status === 'ABERTA') {
      return 'ABERTA'
    } else if (status === 'PROXIMATURMA') {
      return 'PROXIMATURMA'
    } else if (status === 'ENCERRADA') {
      return 'ENCERRADA'
    }

  }

  porStatus(status: any): void {
    let list: Extensao[] = []
    this.ELEMENT_DATA.forEach(element => {
      if (element.status == status)
        list.push(element)
    });
    this.ELEMENT_DATA = list;
    this.dataSource = new MatTableDataSource<Extensao>(list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }


  getExtensao(): void {
    this.extensao.getExtensao().subscribe((resposta ) => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Extensao>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      console.log(resposta)
    })

  }

  confirmationDelete(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogExtensaoComponent)

    dialogRef.afterClosed().subscribe(
      canDelete => {
        if (canDelete) {
          this.extensao.deleteExtensao(id).subscribe(
            () => {
              this.snackbar.open('Extensão deletada!', 'Ok', {
                duration: 3000,
                horizontalPosition: 'left',
                verticalPosition: 'top'
              })
              this.recoverExtensao()
            }
          )
        }
      }
    )
  }

  recoverExtensao() {
    this.extensao.getExtensao().subscribe(
      (novosDados) => {
        this.ELEMENT_DATA = novosDados
      }
    )
  }

  visualizarDetalhesExtensao(idExtensao: number){
    const dialogRef = this.dialog.open(DialogDetalhesExtensaoComponent)

    dialogRef.componentInstance.idExtensao = idExtensao

    console.log(idExtensao)
  }

}
