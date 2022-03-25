import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bet365Service } from '../../../core/services/bet365.service';
import { Market } from '../../../core/interfaces/bet365';

@Component({
  selector: 'app-football-live',
  templateUrl: './football-live.component.html',
  styleUrls: ['./football-live.component.scss'],
})
export class FootballLiveComponent implements OnInit {
  id: string;
  markets: Market[];
  loading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private bet365: Bet365Service,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.bet365.football_odds(this.id).subscribe((data) => {
      this.loading = false;
      this.markets = data;
    });
  }

}
