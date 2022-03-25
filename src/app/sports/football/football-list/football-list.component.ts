import { Component, OnInit } from '@angular/core';
import { Bet365Service } from '../../../core/services/bet365.service';
import { GamesListItem, SportID } from '../../../core/interfaces/bet365';
import { Router } from '@angular/router';

@Component({
  selector: 'app-football-list',
  templateUrl: './football-list.component.html',
  styleUrls: ['./football-list.component.scss'],
})
export class FootballListComponent implements OnInit {
  games: GamesListItem[];
  loading = true;
  sportID = SportID.Soccer;

  constructor(
    private bet365: Bet365Service,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  openGame(id: string): void {
    this.router.navigate(['/dashboard', 'football_live', id]);
  }

  typeToggleChange(value: GamesListItem[]): void {
    this.games = value;
  }
}
