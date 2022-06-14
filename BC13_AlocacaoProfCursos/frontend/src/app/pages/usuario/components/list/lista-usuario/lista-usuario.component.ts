import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioJWT } from 'src/app/auth/models/usuario-jwt';
import { UsuarioService } from 'src/app/services/usuarioJWT.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {

  novaLista: UsuarioJWT[] = [];

  ELEMENT_DATA:UsuarioJWT[] = [
    {
    id: 0,
     login: '',
     password:''
    }
  ]

  displayedColumns: string[] = ['ID', 'login'];
  dataSource = new MatTableDataSource<UsuarioJWT>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private usuario: UsuarioService
  ) { }

  ngOnInit(): void {
    this.getUsuario();
    this.recoverUsuario()
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

  getUsuario(): void {
    this.usuario.getUsuarios().subscribe((resposta ) => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<UsuarioJWT>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  //Utilizando Dialog Delete da Extensao, Mudar depois
 /*  confirmationDelete(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogExtensaoComponent)

    dialogRef.afterClosed().subscribe(
      canDelete => {
        if (canDelete) {
          this.usuario.deleteUsuario(id).subscribe(
            () => {
              this.snackbar.open('Usuario deletado!', 'Ok', {
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
  } */

  recoverUsuario() {
    this.usuario.getUsuarios().subscribe(
      (novosDados) => {
        this.novaLista = novosDados
      }
    )
  }

}
