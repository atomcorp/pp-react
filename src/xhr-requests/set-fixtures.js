// Eventually turn this into a page all of it's own
// that only admin can access
// and upload data

// also need one for doing scores

import firebase from '../firebase';

export default function SetFixtures() {
  const test = firebase.database().ref('2017fixtures/gameweek1');
  const fixtures = gameweek1.fixtures.reduce(function(obj, item, index) {
    const urlToArray = item._links.self.href.split("/");
    const id = urlToArray[urlToArray.length - 1];
    // obj is the {} at the end of reduce
    // each loop adds a new obj
    obj = Object.assign(obj, {[id]: item})
      return obj;
  }, {});

  console.log(fixtures);
  test.set(fixtures);
}

const gameweek1 = {
   "fixtures":[
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159316"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/57"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/338"
            }
         },
         "date":"2017-08-11T18:45:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"Arsenal FC",
         "awayTeamName":"Leicester City FC",
         "result":{
            "goalsHomeTeam":4,
            "goalsAwayTeam":3,
            "halfTime":{
               "goalsHomeTeam":2,
               "goalsAwayTeam":2
            }
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159324"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/346"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/64"
            }
         },
         "date":"2017-08-12T11:30:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"Watford FC",
         "awayTeamName":"Liverpool FC",
         "result":{
            "goalsHomeTeam":3,
            "goalsAwayTeam":3,
            "halfTime":{
               "goalsHomeTeam":2,
               "goalsAwayTeam":1
            }
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159320"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/62"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/70"
            }
         },
         "date":"2017-08-12T14:00:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"Everton FC",
         "awayTeamName":"Stoke City FC",
         "result":{
            "goalsHomeTeam":1,
            "goalsAwayTeam":0,
            "halfTime":{
               "goalsHomeTeam":1,
               "goalsAwayTeam":0
            }
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159325"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/74"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/1044"
            }
         },
         "date":"2017-08-12T14:00:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"West Bromwich Albion FC",
         "awayTeamName":"AFC Bournemouth",
         "result":{
            "goalsHomeTeam":1,
            "goalsAwayTeam":0,
            "halfTime":{
               "goalsHomeTeam":1,
               "goalsAwayTeam":0
            }
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159318"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/61"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/328"
            }
         },
         "date":"2017-08-12T14:00:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"Chelsea FC",
         "awayTeamName":"Burnley FC",
         "result":{
            "goalsHomeTeam":2,
            "goalsAwayTeam":3,
            "halfTime":{
               "goalsHomeTeam":0,
               "goalsAwayTeam":3
            }
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159319"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/354"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/394"
            }
         },
         "date":"2017-08-12T14:00:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"Crystal Palace FC",
         "awayTeamName":"Huddersfield Town",
         "result":{
            "goalsHomeTeam":0,
            "goalsAwayTeam":3,
            "halfTime":{
               "goalsHomeTeam":0,
               "goalsAwayTeam":2
            }
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159323"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/340"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/72"
            }
         },
         "date":"2017-08-12T14:00:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"Southampton FC",
         "awayTeamName":"Swansea City FC",
         "result":{
            "goalsHomeTeam":0,
            "goalsAwayTeam":0,
            "halfTime":{
               "goalsHomeTeam":0,
               "goalsAwayTeam":0
            }
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159317"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/397"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/65"
            }
         },
         "date":"2017-08-12T16:30:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"Brighton & Hove Albion",
         "awayTeamName":"Manchester City FC",
         "result":{
            "goalsHomeTeam":0,
            "goalsAwayTeam":2,
            "halfTime":{
               "goalsHomeTeam":0,
               "goalsAwayTeam":0
            }
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159322"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/67"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/73"
            }
         },
         "date":"2017-08-13T12:30:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"Newcastle United FC",
         "awayTeamName":"Tottenham Hotspur FC",
         "result":{
            "goalsHomeTeam":0,
            "goalsAwayTeam":2
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159321"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/66"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/563"
            }
         },
         "date":"2017-08-13T15:00:00Z",
         "status":"FINISHED",
         "matchday":1,
         "homeTeamName":"Manchester United FC",
         "awayTeamName":"West Ham United FC",
         "result":{
            "goalsHomeTeam":4,
            "goalsAwayTeam":0
         },
         "odds":null
      }
   ]
}

//

// Gameweek 2

//

const gameweek2 = {
   "_links":{
      "self":{
         "href":"http://api.football-data.org/v1/competitions/445/fixtures"
      },
      "competition":{
         "href":"http://api.football-data.org/v1/competitions/445"
      }
   },
   "count":10,
   "fixtures":[
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159313"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/72"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/66"
            }
         },
         "date":"2017-08-19T11:30:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"Swansea City FC",
         "awayTeamName":"Manchester United FC",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159306"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/1044"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/346"
            }
         },
         "date":"2017-08-19T14:00:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"AFC Bournemouth",
         "awayTeamName":"Watford FC",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159307"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/328"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/74"
            }
         },
         "date":"2017-08-19T14:00:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"Burnley FC",
         "awayTeamName":"West Bromwich Albion FC",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159309"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/338"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/397"
            }
         },
         "date":"2017-08-19T14:00:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"Leicester City FC",
         "awayTeamName":"Brighton & Hove Albion",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159310"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/64"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/354"
            }
         },
         "date":"2017-08-19T14:00:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"Liverpool FC",
         "awayTeamName":"Crystal Palace FC",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159013"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/340"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/563"
            }
         },
         "date":"2017-08-19T14:00:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"Southampton FC",
         "awayTeamName":"West Ham United FC",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159312"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/70"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/57"
            }
         },
         "date":"2017-08-19T16:30:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"Stoke City FC",
         "awayTeamName":"Arsenal FC",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159308"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/394"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/67"
            }
         },
         "date":"2017-08-20T12:30:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"Huddersfield Town",
         "awayTeamName":"Newcastle United FC",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159314"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/73"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/61"
            }
         },
         "date":"2017-08-20T15:00:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"Tottenham Hotspur FC",
         "awayTeamName":"Chelsea FC",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      },
      {
         "_links":{
            "self":{
               "href":"http://api.football-data.org/v1/fixtures/159311"
            },
            "competition":{
               "href":"http://api.football-data.org/v1/competitions/445"
            },
            "homeTeam":{
               "href":"http://api.football-data.org/v1/teams/65"
            },
            "awayTeam":{
               "href":"http://api.football-data.org/v1/teams/62"
            }
         },
         "date":"2017-08-21T19:00:00Z",
         "status":"SCHEDULED",
         "matchday":2,
         "homeTeamName":"Manchester City FC",
         "awayTeamName":"Everton FC",
         "result":{
            "goalsHomeTeam":null,
            "goalsAwayTeam":null
         },
         "odds":null
      }
   ]
}