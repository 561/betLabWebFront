import { Component, OnDestroy, OnInit } from '@angular/core';
import { GamesListItem, SportID } from '../../../core/interfaces/bet365';
import { Bet365Service } from '../../../core/services/bet365.service';
import { Router } from '@angular/router';
import { GamesService } from '../../games.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-basketball-list',
  templateUrl: './basketball-list.component.html',
  styleUrls: ['./basketball-list.component.scss'],
})
export class BasketballListComponent implements OnInit, OnDestroy {
  games: GamesListItem[];
  typeOfGames: string;
  countOfGames: number;
  perPage: number;
  loading = true;
  sportID = SportID.Basketball;
  unsubscribe$ = new Subject();
  isMobile = false;

  constructor(
    private bet365: Bet365Service,
    private gamesService: GamesService,
    private router: Router,
    private userService: UserService,
  ) {
    this.isMobile = this.userService.isMobile();
  }

  ngOnInit(): void {
    this.gamesService.getStatusOfGames().pipe(
      takeUntil(this.unsubscribe$),
      tap((typeOfGames) => {
        this.typeOfGames = typeOfGames;
        this.loading = true;
      }),
      switchMap(typeOfGames => {
        return this.gamesService.getListOfGames(typeOfGames, this.sportID, 1, 100);
      }),
    ).subscribe((response) => {
        this.loading = false;
        if (Array.isArray(response.results)) {
          this.games = response.results;
          this.countOfGames = response.pager.total;
          this.perPage = response.pager.per_page;
        }
      }, (error) => {
        console.log(error);
      },
    );
  }

  openGame(id: string): void {
    this.router.navigate(['/dashboard', 'basketball', 'game', id]);
  }

  nextPage(event: PageEvent): void {
    this.loading = true;
    this.gamesService.getListOfGames(
      this.typeOfGames,
      this.sportID,
      event.pageIndex,
      event.pageSize,
    ).subscribe((response) => {
      if (Array.isArray(response.results)) {
        this.games = response.results;
        this.countOfGames = response.pager.total;
      }
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
