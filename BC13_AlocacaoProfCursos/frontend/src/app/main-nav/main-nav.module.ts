import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './main-nav.component';
import { MainNavRoutingModule } from './main-nav-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ MainNavComponent ],
  imports: [ CommonModule, ReactiveFormsModule, MainNavRoutingModule, MaterialModule ],
  exports: [ MainNavComponent ]
})
export class MainNavModule { }
