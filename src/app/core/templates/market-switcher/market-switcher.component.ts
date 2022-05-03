import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Market } from '../../interfaces/bet365';
import { UserService } from '../../services/user.service';
import { GamesService } from '../../../sports/games.service';

@Component({
  selector: 'app-market-switcher',
  templateUrl: './market-switcher.component.html',
  styleUrls: ['./market-switcher.component.scss'],
})
export class MarketSwitcherComponent implements OnInit {
  @Input() markets: Market[] = [];
  @Input() disabled: boolean;
  @Output() marketChanged = new EventEmitter();
  isMobile = false;
  marketToggle: string;

  constructor(
    private userService: UserService,
    private gamesService: GamesService,
  ) {
    this.isMobile = this.userService.isMobile();
  }

  ngOnInit(): void {
    if (this.isMobile) {
      this.marketToggle = this.gamesService.getCurrentMarket().replace('_', ' ');
    } else {
      this.marketToggle = this.gamesService.getCurrentMarket().includes('HT') ? 'HT' : 'FT';
    }
    this.switchMarket(this.marketToggle);
  }

  switchMarket($event: string): void {
    if ($event === 'FT') {
      const markets = this.markets?.filter(market => !market.name.includes('HT')).sort((a, b) => a.name > b.name ? 1 : -1);
      this.marketChanged.emit(markets);
    } else if ($event === 'HT') {
      const markets = this.markets?.filter(market => market.name.includes('HT')).sort((a, b) => a.name > b.name ? 1 : -1);
      this.marketChanged.emit(markets);
    } else {
      this.marketChanged.emit(this.markets?.filter(market => market.name === $event));
    }
  }

}
