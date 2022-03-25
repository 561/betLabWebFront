import { Component, Input, OnInit } from '@angular/core';
import { Odds } from '../../interfaces/bet365';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() name: string;
  @Input() columns: Odds[];
  displayRows = ['time_str', 'ss', 'row1', 'row2', 'row3'];

  constructor() {
  }

  ngOnInit(): void {
  }

}
