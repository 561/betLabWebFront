import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Bet365Service } from '../../services/bet365.service';
import { Subject } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GamesService } from '../../../sports/games.service';

@Component({
  selector: 'app-games-statuses-panel',
  templateUrl: './games-statuses-panel.component.html',
  styleUrls: ['./games-statuses-panel.component.scss'],
})
export class GamesStatusesPanelComponent implements OnInit, OnDestroy {
  queryParams: Params;
  typeToggle: string;
  searchData: string;
  @Input() sport: string;
  destroy$ = new Subject<void>();

  constructor(
    private bet365: Bet365Service,
    private gamesService: GamesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.typeToggle = this.activatedRoute.snapshot.paramMap.get('status') || 'live';
    activatedRoute.queryParams.subscribe(
      (queryParam: Params) => {
        this.queryParams = queryParam;
      },
    );
  }

  goToItem(status: string): void {
    this.router.navigate(['/dashboard', this.sport, status], {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams,
    });
    this.changeValue(status);
  }

  ngOnInit(): void {
    this.changeValue(this.typeToggle);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeValue(value: string): void {
    this.typeToggle = value;
    this.gamesService.setStatusOfGames(value);
  }
}
