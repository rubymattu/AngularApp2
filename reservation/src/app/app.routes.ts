import { Routes } from '@angular/router';

import { Updatereservation } from './updatereservation/updatereservation';
import { Addreservation } from './addreservation/addreservation';
import { Viewreservation } from './viewreservation/viewreservation';
import { About } from './about/about'; 
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'about', component: About, canActivate: [authGuard] },
  { path: 'viewreservation', component: Viewreservation, canActivate: [authGuard] },
  { path: 'addreservation', component: Addreservation, canActivate: [authGuard] },
  { path: 'updatereservation',component: Updatereservation, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: "**", redirectTo: "/viewreservation", pathMatch: "full" },
  { path: '', component: Viewreservation, canActivate: [authGuard] }
];
