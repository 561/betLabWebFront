import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../interfaces/bet365';

@Component({
  selector: 'app-game-info-header',
  templateUrl: './game-info-header.component.html',
  styleUrls: ['./game-info-header.component.scss'],
})
export class GameInfoHeaderComponent implements OnInit {
  @Input() game: Game;
  @Input() sport: string;

  constructor() { }

  ngOnInit(): void {
  }

}
