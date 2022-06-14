import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { email, maxLength, minLength, required, getInputError, pattern } from 'src/app/utils/Validators';
import { AuthenticationService } from '../../service/autentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usuario: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  })



  constructor(
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  submit(login: string): void {
    let key = "login";
    localStorage.setItem(key, login);
    localStorage.setItem("reload", "true");
    this.authService.login(this.usuario.value)
    .subscribe(
      () => {
        this.router.navigateByUrl('home')
        this.snackbar.open(' Login Autorizado!', 'Ok',
            { duration: 6000, horizontalPosition: 'center', verticalPosition: 'top' })
      }
    )


  }





}
