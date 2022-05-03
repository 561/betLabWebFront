import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, GamesList } from '../interfaces/bet365';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Bet365Service {

  constructor(private http: HttpClient) {
  }

  liveGames(sport_id: number, page: number, pageSize: number, params?: Params): Observable<GamesList> {
    return this.http.get<GamesList>(`/api/v1/live_games/`, {
      params: {
        sport_id,
        page,
        per_page: pageSize,
        ...params,
      },
    });
  }

  prematchGames(sport_id: number, page: number, pageSize: number, params?: Params): Observable<GamesList> {
    return this.http.get<GamesList>(`/api/v1/prematch_games/`, {
      params: {
        sport_id,
        page,
        per_page: pageSize,
        ...params,
      },
    });
  }

  finishedGames(sport_id: number, page: number, pageSize: number, params?: Params): Observable<GamesList> {
    return this.http.get<GamesList>(`/api/v1/finished_games/`, {
      params: {
        sport_id,
        page,
        per_page: pageSize,
        ...params,
      },
    });
  }

  football_odds(game_id: string, markets: string): Observable<Game> {
    return this.http.get<Game>('/api/v1/football/game', {
      params: {
        game_id,
        markets,
      },
    });
  }

  basketball_odds(game_id: string, markets: string): Observable<Game> {
    return this.http.get<Game>('/api/v1/basketball/game', {
      params: {
        game_id,
        markets,
      },
    });
  }
}
