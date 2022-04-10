import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FootballLiveComponent } from './football/football-live/football-live.component';
import { FootballListComponent } from './football/football-list/football-list.component';
import { BasketballListComponent } from './basketball/basketball-list/basketball-list.component';
import { BasketballLiveComponent } from './basketball/basketball-live/basketball-live.component';

const routes: Routes = [
  { path: 'football/game/:id', component: FootballLiveComponent },
  { path: 'basketball/game/:id', component: BasketballLiveComponent },
  { path: 'football', component: FootballListComponent },
  { path: 'basketball', component: BasketballListComponent },
  { path: 'football/:status', component: FootballListComponent },
  { path: 'basketball/:status', component: BasketballListComponent },
  { path: '', component: FootballListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportsRoutngModule {
}
