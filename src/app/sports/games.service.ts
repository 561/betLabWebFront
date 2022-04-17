import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GamesList } from '../core/interfaces/bet365';
import { Bet365Service } from '../core/services/bet365.service';


@Injectable({
  providedIn: 'root',
})
export class GamesService {
  statusOfGames$: Subject<string> = new Subject<string>();

  constructor(
    private bet365: Bet365Service,
  ) {
  }

  getStatusOfGames(): Observable<string> {
    return this.statusOfGames$.asObservable();
  }

  setStatusOfGames(status: string): void {
    this.statusOfGames$.next(status);
  }

  private getFetchForListOfGames(typeOfGames: string, sportID: number, page: number, pageSize: number): Observable<GamesList> {
    if (typeOfGames === 'live') {
      return this.bet365.live_games(sportID, page, pageSize);
    }
    if (typeOfGames === 'prematch') {
      return this.bet365.prematch_games(sportID, page, pageSize);
    }
    return this.bet365.finished_games(sportID, page, pageSize);
  }

  getListOfGames(typeOfGames: string, sportID: number, page: number, pageSize: number): Observable<GamesList> {
    return this.getFetchForListOfGames(typeOfGames, sportID, page, pageSize);
  }
}
