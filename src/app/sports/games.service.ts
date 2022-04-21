import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GamesList } from '../core/interfaces/bet365';
import { Bet365Service } from '../core/services/bet365.service';
import { Params } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class GamesService {
  statusOfGames$: Subject<string> = new Subject<string>();
  clearSearch$: Subject<void> = new Subject<void>();

  constructor(
    private bet365: Bet365Service,
  ) {
  }

  getStatusOfGames(): Observable<string> {
    return this.statusOfGames$.asObservable();
  }

  getClearSearch(): Observable<void> {
    return this.clearSearch$.asObservable();
  }

  setStatusOfGames(status: string): void {
    this.statusOfGames$.next(status);
  }

  clearSearch(): void {
    this.clearSearch$.next();
  }

  private getFetchForListOfGames(
    typeOfGames: string,
    sportID: number, page: number,
    pageSize: number,
    params?: Params,
  ): Observable<GamesList> {
    if (typeOfGames === 'live') {
      return this.bet365.liveGames(sportID, page, pageSize, params);
    }
    if (typeOfGames === 'prematch') {
      return this.bet365.prematchGames(sportID, page, pageSize, params);
    }
    return this.bet365.finishedGames(sportID, page, pageSize, params);
  }

  getListOfGames(typeOfGames: string, sportID: number, page: number, pageSize: number, params?: Params): Observable<GamesList> {
    return this.getFetchForListOfGames(typeOfGames, sportID, page, pageSize, params);
  }
}
