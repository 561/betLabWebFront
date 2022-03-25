import { Component, OnInit } from '@angular/core';
import { GamesListItem, SportID } from '../../../core/interfaces/bet365';
import { Bet365Service } from '../../../core/services/bet365.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basketball-list',
  templateUrl: './basketball-list.component.html',
  styleUrls: ['./basketball-list.component.scss'],
})
export class BasketballListComponent implements OnInit {
  games: GamesListItem[];
  loading = true;
  sportID = SportID.Basketball;

  constructor(
    private bet365: Bet365Service,
    private router: Router,
  ) {

  }

  ngOnInit(): void {

  }

  openGame(id: string): void {
    this.router.navigate(['/dashboard', `basketball_live`, id]);
  }

  typeToggleChange(value: GamesListItem[]): void {
    this.games = value;
  }
}
