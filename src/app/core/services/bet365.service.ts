import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, GamesList } from '../interfaces/bet365';

@Injectable({
  providedIn: 'root',
})
export class Bet365Service {

  constructor(private http: HttpClient) {
  }

  live_games(sport_id: number, page: number, pageSize: number): Observable<GamesList> {
    return this.http.get<GamesList>(`/api/v1/live_games/`, {
      params: {
        sport_id,
        page,
        per_page: pageSize,
      },
    });
  }

  prematch_games(sport_id: number, page: number, pageSize: number): Observable<GamesList> {
    return this.http.get<GamesList>(`/api/v1/prematch_games/`, {
      params: {
        sport_id,
        page,
        per_page: pageSize,
      },
    });
  }

  finished_games(sport_id: number, page: number, pageSize: number): Observable<GamesList> {
    return this.http.get<GamesList>(`/api/v1/finished_games/`, {
      params: {
        sport_id,
        page,
        per_page: pageSize,
      },
    });
  }

  football_odds(game_id: string): Observable<Game> {
    return this.http.get<Game>(`/api/v1/football/game?game_id=${game_id}`);
  }

  basketball_odds(game_id: string): Observable<Game> {
    return this.http.get<Game>(`/api/v1/basketball/game?game_id=${game_id}`);
  }
}
