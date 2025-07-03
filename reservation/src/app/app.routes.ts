import { Routes } from '@angular/router';

import { AreasComponent } from './areas/areas';

export const routes: Routes = [
  { path: "areas", component: AreasComponent},
  { path: "**", redirectTo: "/areas", pathMatch: "full" } // Redirect to areas if no other route matches
];
