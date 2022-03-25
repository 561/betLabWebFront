import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootballLiveComponent } from './football/football-live/football-live.component';
import { RouterModule } from '@angular/router';
import { FootballListComponent } from './football/football-list/football-list.component';
import { SportsRoutngModule } from './sports-routng.module';
import { MatListModule } from '@angular/material/list';
import { TableComponent } from '../core/templates/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BasketballListComponent } from './basketball/basketball-list/basketball-list.component';
import { BasketballLiveComponent } from './basketball/basketball-live/basketball-live.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { GamesStatusesPanelComponent } from '../core/templates/games-statuses-panel/games-statuses-panel.component';

@NgModule({
  declarations: [
    FootballLiveComponent,
    FootballListComponent,
    BasketballListComponent,
    BasketballLiveComponent,
    TableComponent,
    GamesStatusesPanelComponent,
  ],
  imports: [
    CommonModule,
    SportsRoutngModule,
    RouterModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonToggleModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class DashboardsModule {
}
