import { Component, Input, OnInit } from '@angular/core';
import { Market, Odd } from '../../interfaces/bet365';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() market: Market;
  displayRows = ['time_str', 'ss', 'row1', 'row2', 'row3', 'rating'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
