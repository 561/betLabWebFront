import { Component, OnInit } from '@angular/core';
import { Game } from '../../../core/interfaces/bet365';
import { ActivatedRoute } from '@angular/router';
import { Bet365Service } from '../../../core/services/bet365.service';

@Component({
  selector: 'app-basketball-live',
  templateUrl: './basketball-live.component.html',
  styleUrls: ['./basketball-live.component.scss'],
})
export class BasketballLiveComponent implements OnInit {
  id: string;
  game: Game;
  loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bet365: Bet365Service,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.bet365.basketball_odds(this.id).subscribe((data) => {
      this.loading = false;
      this.game = data;
    });
  }
}
