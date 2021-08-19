import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { CmsComponent } from './cms/cms.component';
import { DetailComponent } from './cms/detail/detail.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReloginComponent } from './login/relogin/relogin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SupportComponent } from './support/support.component';
import { UsersComponent } from './users/users.component';
import { ResidenceComponent } from './residence/residence.component';
import { InprogressComponent } from './support/inprogress/inprogress.component';
import { ClosedComponent } from './support/closed/closed.component';
import { RtRwComponent } from './rt-rw/rt-rw.component';
import { PanicButtonComponent } from './panic-button/panic-button.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "relogin", component: ReloginComponent },
  
  { path: "home", component: HomeComponent, canActivate: [AuthGuard], data:{active:"home"} },
  { path: "cms", component: CmsComponent, canActivate: [AuthGuard], data:{active:"cms"}  },
  { path: "cms/create", component: DetailComponent, canActivate: [AuthGuard], data:{active:"cms"}  },
  { path: "cms/detail/:id", component: DetailComponent, canActivate: [AuthGuard], data:{active:"cms"}  },
  { path: "billing", component: BillingComponent, canActivate: [AuthGuard], data:{active:"billing"} },
  { path: "support", component: SupportComponent, canActivate: [AuthGuard], data:{active:"support"} },
  { path: "support/inprogress", component: InprogressComponent, canActivate: [AuthGuard], data:{active:"support"} },
  { path: "support/closed", component: ClosedComponent, canActivate: [AuthGuard], data:{active:"support"} },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard], data:{active:"users"} },
  { path: "residence", component: ResidenceComponent, canActivate: [AuthGuard], data:{active:"residence"} },
  { path: "rt-rw", component: RtRwComponent, canActivate: [AuthGuard], data:{active:"rt-rw"} },
  { path: "panic-button", component: PanicButtonComponent, canActivate: [AuthGuard], data:{active:"panic-button"} },
 
  { path: "**", component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
