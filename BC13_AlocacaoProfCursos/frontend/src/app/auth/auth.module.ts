import { AuthRoutingModule } from './auth-routing.module';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MaterialModule } from "../material/material.module";
import { LoginComponent } from "./pages/login/login.component";
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthenticationService } from './service/autentication.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule,

    ReactiveFormsModule,
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
      return {
        ngModule: AuthModule,
        providers: [
          {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
          }
        ]
      }
    }
  }