export enum SportID {
  Soccer = 1,
  Basketball = 18,
  Tennis = 13,
  Volleyball = 91,
  Handball = 78,
  Baseball = 16,
  HorseRacing = 2,
  Greyhounds = 4,
  IceHockey = 17,
  Snooker = 14,
  AmericanFootball = 12,
  Cricket = 3,
  Futsal = 83,
  Darts = 15,
  TableTennis = 92,
  Badminton = 94,
  RugbyUnion = 8,
  RugbyLeague = 19,
  AustralianRules = 36,
  Bowls = 66,
  BoxingUFC = 9,
  GaelicSports = 75,
  Floorball = 90,
  BeachVolleyball = 95,
  WaterPolo = 110,
  Squash = 107,
  Esports = 151,
}

export interface Pager {
  page: number;
  per_page: number;
  total: number;
}

export interface TeamLeague {
  id: string;
  name: string;
  image_id?: string;
  cc: string;
}

export interface Timer {
  tm: number;
  ts: number;
  tt: string;
  ta: number;
  md: number;
}

export interface Extra {
  away_pos: string;
  home_pos: string;
  length: number;
  numberofperiods: string;
  periodlength: string;
  round: string;
  stadium_data?: {
    capacity?: string;
    city?: string;
    country?: string;
    googlecoords?: string;
    id: string;
    name: string;
  };
}

export interface LiveGames {
  succes: number;
  results: LiveResult[];
  pager: Pager;
}

export interface Time {
  tm: string;
  ts: string;
  q: string;
  tt: string;
}

export interface GamesListItem {
  id: string;
  home: string;
  away: string;
  league: string;
  scores: string;
  time: Time;
  time_status: string;
}

export interface Market {
  'name': string;
  'odds': Odd[];
  'firstLine'?: Odd;
  'firstPrematch'?: Odd;
}


export interface Odd {
  add_time: string;
  id: string;
  row1: string;
  row2: string;
  row3: string;
  ss: string;
  time_str: string;
  solved?: number;
  rating?: number;
}

export interface LiveResult {
  away: TeamLeague;
  bet365_id: string;
  extra: Extra;
  home: TeamLeague;
  id: string;
  league: TeamLeague;
  scores: {
    2: {
      home: string;
      away: string;
    };
  };
  sport_id: string;
  ss: string;
  time: string;
  time_status: string;
  timer: Timer;
}

