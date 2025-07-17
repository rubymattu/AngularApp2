import { Routes } from '@angular/router';

import { Updatereservation } from './updatereservation/updatereservation';
import { Addreservation } from './addreservation/addreservation';
import { Viewreservation } from './viewreservation/viewreservation';
import { About } from './about/about'; 

export const routes: Routes = [
   { path: 'about', component: About },
  { path: 'viewreservation', component: Viewreservation },
  { path: 'updatereservation',loadComponent: () => 
    import('./updatereservation/updatereservation').then(m => m.Updatereservation),  
   },
  { path: 'addreservation', component: Addreservation  },
  { path: "**", redirectTo: "/viewreservation", pathMatch: "full" },
  {
    path: '',
    component: Viewreservation, // 👈 This ensures it loads at startup
  } // Redirect to areas if no other route matches
];
