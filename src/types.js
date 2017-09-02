// @flow

export type FixtureType = {
  date: string,
  homeTeamName: string,
  awayTeamName: string,
  status: string,
  result: {
    goalsHomeTeam: number,
    goalsAwayTeam: number
  }
};

export type PredictionType = {
  awayScore: ?number,
  homeScore: ?number,
  id: string,
  points: ?number
};

export type FixturesType = {
  [key: string]: FixtureType
}

export type PredictionsType = {
  [key: string]: PredictionType
}

export type GameType = {
  canPredict: boolean,
  gameweek: number,
  season: string,
  time: number,
  totalGameweeks: number
};

export type PlayerType = {
  id: string,
  lastWeeksPoints: number,
  name: string,
  points: number,
  team: string
};