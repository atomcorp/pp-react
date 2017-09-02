// @flow

export type FixturesType = {
  date: string,
  homeTeamName: string,
  awayTeamName: string,
  status: string,
  result: {
    goalsHomeTeam: number,
    goalsAwayTeam: number
  }
};

export type PredictionsType = {
  awayScore: number,
  homeScore: number,
  id: string,
  points: number
};

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