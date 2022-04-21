import { Component, Input, OnInit } from '@angular/core';
import { GamesService } from '../../../sports/games.service';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
})
export class SearchItemComponent implements OnInit {
  @Input() searchItem: string;

  constructor(
    private gamesService: GamesService,
  ) { }

  ngOnInit(): void {
  }

  clear(): void {
    this.gamesService.clearSearch();
  }
}
