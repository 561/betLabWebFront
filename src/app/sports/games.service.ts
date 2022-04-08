import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GamesListItem } from '../core/interfaces/bet365';
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

  private getFetchForListOfGames(typeOfGames: string, sportID: number): Observable<GamesListItem[]> {
    if (typeOfGames === 'live') {
      return this.bet365.live_games(sportID);
    }
    if (typeOfGames === 'prematch') {
      return this.bet365.prematch_games(sportID);
    }
    return this.bet365.finished_games(sportID);
  }

  getListOfGames(typeOfGames: string, sportID: number): Observable<GamesListItem[]> {
    return this.getFetchForListOfGames(typeOfGames, sportID);
  }
}
