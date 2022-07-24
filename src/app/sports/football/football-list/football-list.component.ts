import { Component, OnDestroy, OnInit } from '@angular/core';
import { Bet365Service } from '../../../core/services/bet365.service';
import { GamesList, GamesListItem, SportID } from '../../../core/interfaces/bet365';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  queryParams: Params;
  loading = true;
  sportID = SportID.Football;
  unsubscribe$ = new Subject();
  isMobile = false;

  constructor(
    private bet365: Bet365Service,
    private gamesService: GamesService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.isMobile = this.userService.isMobile();
    activatedRoute.queryParams.subscribe(
      (queryParam: Params) => {
        this.queryParams = queryParam;
      },
    );
  }

  ngOnInit(): void {
    this.gamesService.getStatusOfGames().pipe(
      takeUntil(this.unsubscribe$),
      tap((typeOfGames) => {
        this.typeOfGames = typeOfGames;
        this.loading = true;
      }),
      switchMap(typeOfGames => {
        return this.gamesService.getListOfGames(typeOfGames, this.sportID, 1, 100, this.queryParams);
      }),
    ).subscribe((response) => {
        this.updateData(response);
      }, (error) => {
        console.log(error);
      },
    );
  }

  nextPage(event: PageEvent): void {
    this.loading = true;
    this.gamesService.getListOfGames(
      this.typeOfGames,
      this.sportID,
      event.pageIndex + 1,
      event.pageSize,
      this.queryParams,
    ).subscribe((response) => {
      this.updateData(response);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  private updateData(response: GamesList): void {
    if (Array.isArray(response.results)) {
      this.games = response.results;
      this.countOfGames = response.pager.total;
      this.perPage = response.pager.per_page;
    }
    this.loading = false;
  }
}
