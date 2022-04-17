import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bet365Service } from '../../../core/services/bet365.service';
import { Game, Market, SportID } from '../../../core/interfaces/bet365';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-football-live',
  templateUrl: './football-live.component.html',
  styleUrls: ['./football-live.component.scss'],
})
export class FootballLiveComponent implements OnInit {
  id: string;
  game: Game;
  loading = true;
  isMobile = false;
  sportID = SportID.Soccer;
  markets: Market[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bet365: Bet365Service,
    private userService: UserService,
  ) {
    this.isMobile = this.userService.isMobile();
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.bet365.football_odds(this.id).subscribe((data) => {
      this.loading = false;
      this.game = data;
    });
  }

  onChangeMarket($event: Market[]): void {
    this.markets = $event;
  }
}
