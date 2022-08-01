import { Component, Input, OnInit } from '@angular/core';
import { Market, Odd } from '../../interfaces/bet365';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() sport: string;
  @Input() market: Market;
  @Input() signalRating: number;
  displayRows: string[];
  rating2Green = new Set();
  rating2Red = new Set();

  constructor() {
  }

  ngOnInit(): void {
    this.displayRows = ['game_time', 'ss', 'row1', 'row2', 'row3', 'rating', 'rating2', 'world_time'];
    this.getRating2rows(this.market);
    if (this.market.name.includes('1X2')) {
      this.displayRows.splice(5, 2);
    }
  }


  getRatingColor(rating: number, odd: Odd, row?: number): string {
    if (!odd.rating[0]) {
      return `210, 210, 210`;
    }
    const green = rating > 0 ? 200 : 100;
    const red = rating < 0 ? 200 : 100;
    const ratio = Math.abs(rating / this.signalRating);
    let opacity = 0;
    if (ratio >= 1) {
      opacity = 1;
    } else if (ratio >= 0.5) {
      opacity = 0.8 * (ratio - 0.4);
    }
    if (row) {
      return this.getProgruz(row, odd, opacity);
    }
    return `${red}, ${green}, 100, ${opacity}`;
  }

  getRating2rows(market: Market): void {
    let search = false;
    let rating1 = 0;
    let rating2 = 0;
    let startIndex = 0;
    market.odds.forEach((item, index) => {
      if (search && rating1 - item.rating[0] === rating2) {
        search = false;
        for (let i = startIndex; i <= index; i++) {
          rating2 > 0 ? this.rating2Green.add(i) : this.rating2Red.add(i);
        }
      }
      if (item.rating[1]) {
        search = true;
        rating1 = item.rating[0];
        rating2 = item.rating[1];
        startIndex = index;
      }
    });
  }

  getProgruz(row: number, odd: Odd, opacity: number): string {
    let rating = odd.rating[0] || 0;
    if (!this.market.isHomeFavoritePrematch && (!this.market.firstLine || odd.world_time <= this.market.firstLine?.world_time)) {
      rating = -rating;
    }
    if (!this.market.isHomeFavoriteLive && this.market.firstLine && (odd.world_time > this.market.firstLine?.world_time)) {
      rating = -rating;
    }
    if (row === 1 && rating < 0) {
      return `255, 255, 180, ${opacity}`;
    }
    if (row === 2) {
      return `255, 255, 180, ${opacity}`;
    }
    if (row === 3 && rating > 0) {
      return `255, 255, 180, ${opacity}`;
    }
    return `255, 255, 180, 0`;
  }

}
