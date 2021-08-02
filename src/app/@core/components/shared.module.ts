import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    HeaderComponent
  ],
})
export class SharedModule { }
