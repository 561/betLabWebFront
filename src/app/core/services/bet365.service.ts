import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GamesListItem, Market } from '../interfaces/bet365';

@Injectable({
  providedIn: 'root',
})
export class Bet365Service {

  constructor(private http: HttpClient) {
  }

  live_games(sport_id: number): Observable<GamesListItem[]> {
    return this.http.get<GamesListItem[]>(`/api/v1/live_games/`, {
      params: {
        sport_id,
      },
    });
  }

  prematch_games(sport_id: number): Observable<GamesListItem[]> {
    return this.http.get<GamesListItem[]>(`/api/v1/prematch_games/`, {
      params: {
        sport_id,
      },
    });
  }

  finished_games(sport_id: number): Observable<GamesListItem[]> {
    return this.http.get<GamesListItem[]>(`/api/v1/finished_games/`, {
      params: {
        sport_id,
      },
    });
  }

  football_odds(game_id: string): Observable<Market[]> {
    return this.http.get<Market[]>(`/api/v1/football/game?game_id=${game_id}`);
  }

  basketball_odds(game_id: string): Observable<Market[]> {
    return this.http.get<Market[]>(`/api/v1/basketball/game?game_id=${game_id}`);
  }
}
