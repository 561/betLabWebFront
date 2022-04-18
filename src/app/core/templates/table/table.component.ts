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

  constructor() {
  }

  ngOnInit(): void {
    if (this.market.name.includes('1X2')) {
      this.displayRows = ['game_time', 'ss', 'row1', 'row2', 'row3', 'world_time'];
    }
    if (this.market.name.includes('Total') || this.market.name.includes('Handicap')) {
      this.displayRows = ['game_time', 'ss', 'row1', 'row2', 'row3', 'rating', 'world_time'];
    }
    if (this.sport === 'basketball' && this.market.name.includes('Handicap')) {
      this.displayRows.splice(this.displayRows.length - 1, 0, 'rating2');
      this.displayRows.splice(this.displayRows.length - 1, 0, 'rating3');
    }
  }


  getRatingColor(rating: number, odd: Odd, row?: number): string {
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
    if (odd.game_time && +odd.game_time > 75) {
      return '200, 200, 200';
    }
    return `${red}, ${green}, 100, ${opacity}`;
  }

  getProgruz(row: number, odd: Odd, opacity: number): string {
    const rating = odd.rating?.rating || 0;
    if (odd.game_time && +odd.game_time > 75) {
      return `255, 255, 180, 0`;
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
