import { AuthGuard } from './../../@core/guards/auth.guard';
import { Role } from './../../@core/enum/role';
import { CreateNewTicketComponent } from './components/create-new-ticket/create-new-ticket.component';
import { ShowAllTicketsComponent } from './components/show-all-tickets/show-all-tickets.component';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'all-tickets',
        component: ShowAllTicketsComponent
      },
      {
        path: 'new-ticket',
        component: CreateNewTicketComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin]}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
