import { HomeComponent } from './home.component';
import { SharedModule } from './../../@core/components/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ShowAllTicketsComponent } from './components/show-all-tickets/show-all-tickets.component';
import { CreateNewTicketComponent } from './components/create-new-ticket/create-new-ticket.component';
import { DataChartsComponent } from './components/data-charts/data-charts.component';


@NgModule({
  declarations: [
    HomeComponent,
    ShowAllTicketsComponent,
    CreateNewTicketComponent,
    DataChartsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
