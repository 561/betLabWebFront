import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Bet365Service } from '../../../core/services/bet365.service';
import { Game, Market, oddsDictionary, SportID } from '../../../core/interfaces/bet365';
import { UserService } from '../../../core/services/user.service';
import { GamesService } from '../../games.service';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-football-live',
  templateUrl: './football-live.component.html',
  styleUrls: ['./football-live.component.scss'],
})
export class FootballLiveComponent implements OnInit {
  id: string;
  game: Game;
  loading = true;
  loadingLastMarkets = true;
  isMobile = false;
  sportID = SportID.Football;
  markets: Market[] = [];
  lastMarkets = new Set([1, 2, 3, 5, 6, 8]);

  constructor(
    private activatedRoute: ActivatedRoute,
    private bet365: Bet365Service,
    private gamesService: GamesService,
    private userService: UserService,
  ) {
    this.isMobile = this.userService.isMobile();
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    activatedRoute.queryParams.subscribe(
      (queryParam: Params) => {
        this.gamesService.setCurrentMarket(queryParam[`market`]);
      },
    );
  }

  ngOnInit(): void {
    this.bet365.football_odds(this.id, this.getFirstMarkets()).pipe(
      tap((data) => {
        this.loading = false;
        this.game = data;
      }),
      switchMap(() => {
        let markets = '';
        for (const amount of this.lastMarkets.values()) {
          markets = markets + amount + ',';
        }
        return this.bet365.football_odds(this.id, markets);
      }),
    ).subscribe(data => {
      this.loadingLastMarkets = false;
      if (data.markets) {
        data.markets.forEach(market => this.game.markets?.push(market));
      }
    });
  }

  getFirstMarkets(): string {
    const currentMarket = this.gamesService.getCurrentMarket();
    if (this.isMobile) {
      this.lastMarkets.delete(oddsDictionary[this.sportID][this.gamesService.getCurrentMarket()]);
      return oddsDictionary[this.sportID][currentMarket].toString();
    }
    this.lastMarkets = new Set(currentMarket.includes('HT') ? [1, 2, 3] : [5, 6, 8]);
    return currentMarket.includes('HT') ? '5,6,8' : '1,2,3';
  }

  onChangeMarket($event: Market[]): void {
    this.markets = $event;
  }
}
