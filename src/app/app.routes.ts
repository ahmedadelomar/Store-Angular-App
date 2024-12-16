import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages//admin/view/admin.component';
import { UserComponent } from './pages/user/view/user.component';
import { RoleGuard } from './core/guards/role.guards';
import { AuthGuard } from './core/guards/auth.guards';
import { NgModule } from '@angular/core';
import { UnAuthorizedComponent } from './pages/un-authorized/un-authorized.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin-page',
    component: AdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }, // Admin can access this route
  },
  {
    path: 'user-page',
    component: UserComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'user' }, // User can access this route
  },
  {
    path: 'unauthorized',
    component: UnAuthorizedComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
