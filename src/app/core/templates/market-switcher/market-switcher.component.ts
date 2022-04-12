import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Market } from '../../interfaces/bet365';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-market-switcher',
  templateUrl: './market-switcher.component.html',
  styleUrls: ['./market-switcher.component.scss'],
})
export class MarketSwitcherComponent implements OnInit {
  @Input() markets: Market[] = [];
  @Output() marketChanged = new EventEmitter();
  isMobile = false;
  marketToggle: string;

  constructor(
    private userService: UserService,
  ) {
    this.isMobile = this.userService.isMobile();
  }

  ngOnInit(): void {
    this.marketToggle = this.isMobile ? '1X2' : 'FT';
    this.switchMarket(this.marketToggle);
  }

  switchMarket($event: string): void {
    console.log($event);
    if ($event === 'FT') {
      this.marketChanged.emit(this.markets?.filter(market => !market.name.includes('HT')));
    } else if ($event === 'HT') {
      this.marketChanged.emit(this.markets?.filter(market => market.name.includes('HT')));
    } else {
      this.marketChanged.emit(this.markets?.filter(market => market.name === $event));
    }
  }

}
