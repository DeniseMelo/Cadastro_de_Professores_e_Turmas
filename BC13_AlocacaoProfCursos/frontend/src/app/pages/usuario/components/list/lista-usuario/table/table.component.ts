import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioJWT } from 'src/app/auth/models/usuario-jwt';
import { DeleteDialogExtensaoComponent } from 'src/app/pages/extensao/components/delete-dialog-extensao/delete-dialog-extensao.component';
import { UsuarioService } from 'src/app/services/usuarioJWT.service';
import { DeleteDialogComponent } from '../../../dialog/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  novaLista: UsuarioJWT[] = [];

  ELEMENT_DATA:UsuarioJWT[] = [
    {
      id: 0,
      login: '',
      password:''
    }
  ]

  displayedColumns: string[] = ['id', 'login', 'acoes'];
  dataSource = new MatTableDataSource<UsuarioJWT>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private usuario: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
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

  getUsuarios(): void {
    this.usuario.getUsuarios().subscribe((r) => {
      this.ELEMENT_DATA = r;
      this.dataSource = new MatTableDataSource<UsuarioJWT>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }


  confirmationDelete(id: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent)

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
              this.recoverUsuario()
            }
          )
        }
      }
    )
  }

  novoFuncionario():void{
    this.router.navigateByUrl("/usuario/novoUsuario")
  }

  recoverUsuario() {
    this.usuario.getUsuarios().subscribe(
      (novosDados) => {
        this.novaLista = novosDados
      }
    )
  }

}