import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bet365Service } from '../../../core/services/bet365.service';
import { GamesListItem, SportID } from '../../../core/interfaces/bet365';
import { Router } from '@angular/router';
import { GamesService } from '../../games.service';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-football-list',
  templateUrl: './football-list.component.html',
  styleUrls: ['./football-list.component.scss'],
})
export class FootballListComponent implements OnInit, OnDestroy {
  games: GamesListItem[];
  countOfGames: number;
  perPage: number;
  typeOfGames: string;
  loading = true;
  sportID = SportID.Soccer;
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
    this.router.navigate(['/dashboard', 'football', 'game', id]);
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
