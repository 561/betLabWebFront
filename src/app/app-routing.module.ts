import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard/football/live',
  },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./sports/dashboards.module').then(l => l.DashboardsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
