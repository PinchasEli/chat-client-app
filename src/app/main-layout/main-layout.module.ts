import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';



@NgModule({
  declarations: [
    MainLayoutComponent,
    HeaderComponent
  ],
  
  imports: [
    CommonModule,
    MainLayoutRoutingModule
  ],

  exports: [
    MainLayoutComponent,
    HeaderComponent
  ]
})
export class MainLayoutModule { }
