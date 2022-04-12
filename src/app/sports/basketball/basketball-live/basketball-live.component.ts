import { Component, OnInit } from '@angular/core';
import { Game, Market } from '../../../core/interfaces/bet365';
import { ActivatedRoute } from '@angular/router';
import { Bet365Service } from '../../../core/services/bet365.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-basketball-live',
  templateUrl: './basketball-live.component.html',
  styleUrls: ['./basketball-live.component.scss'],
})
export class BasketballLiveComponent implements OnInit {
  id: string;
  game: Game;
  loading = true;
  isMobile = false;
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
    this.bet365.basketball_odds(this.id).subscribe((data) => {
      this.loading = false;
      this.game = data;
    });
  }

  onChangeMarket($event: Market[]): void {
    this.markets = $event;
  }
}
