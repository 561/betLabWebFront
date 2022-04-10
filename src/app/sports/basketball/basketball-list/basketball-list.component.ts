import { Component, OnDestroy, OnInit } from '@angular/core';
import { GamesListItem, SportID } from '../../../core/interfaces/bet365';
import { Bet365Service } from '../../../core/services/bet365.service';
import { Router } from '@angular/router';
import { GamesService } from '../../games.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-basketball-list',
  templateUrl: './basketball-list.component.html',
  styleUrls: ['./basketball-list.component.scss'],
})
export class BasketballListComponent implements OnInit, OnDestroy {
  games: GamesListItem[];
  typeOfGames: string;
  loading = true;
  sportID = SportID.Basketball;
  unsubscribe$ = new Subject();

  constructor(
    private bet365: Bet365Service,
    private gamesService: GamesService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.gamesService.getStatusOfGames().pipe(
      takeUntil(this.unsubscribe$),
      tap((typeOfGames) => {
        this.typeOfGames = typeOfGames;
        this.loading = true;
      }),
      switchMap(typeOfGames => {
        return this.gamesService.getListOfGames(typeOfGames, this.sportID);
      }),
    ).subscribe((games) => {
        this.loading = false;
        if (Array.isArray(games)) {
          this.games = games;
        }
      }, (error) => {
        console.log(error);
      },
    );
  }

  openGame(id: string): void {
    this.router.navigate(['/dashboard', 'basketball_live', 'game', id]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
