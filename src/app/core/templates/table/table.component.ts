import { Component, Input, OnInit } from '@angular/core';
import { Market } from '../../interfaces/bet365';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() market: Market;
  displayRows: string[];

  constructor() {
  }

  ngOnInit(): void {
    if (this.market.name.includes('1X2')) {
      this.displayRows = ['game_time', 'ss', 'row1', 'row2', 'row3', 'world_time'];
    } else {
      this.displayRows = ['game_time', 'ss', 'row1', 'row2', 'row3', 'rating', 'world_time'];
    }
  }

  getRatingColor(rating: number): string {
    const signalRating = 0.6;
    const green = rating > 0 ? 200 : 100;
    const red = rating < 0 ? 200 : 100;
    const ratio = Math.abs(rating / signalRating);
    let opacity = 0;
    if (ratio >= 1) {
      opacity = 1;
    }
    if (ratio >= 0.5) {
      opacity = 0.8 * (ratio - 0.4);
    }
    return `${red}, ${green}, 100, ${opacity}`;
  }

}
