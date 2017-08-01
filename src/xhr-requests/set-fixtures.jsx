import firebase from '../firebase';

export default function SetFixtures() {
  const test = firebase.database().ref('14-15');
  const fixtures = {
    "gameweek1": {
      "hlj7q": {"home":"Manchester United ","away":"Swansea City","date":"2014-08-16","time":"12:45","id":"hlj7q","gameweek":1, "homeScore": 0, "awayScore": 0},
      "k9bhb": {"home":"Leicester City ","away":"Everton","date":"2014-08-16","time":"15:00","id":"k9bhb","gameweek":1, "homeScore": 0, "awayScore": 0},
      "rs2h9i": {"home":"Queens Park Rangers ","away":"Hull City","date":"2014-08-16","time":"15:00","id":"rs2h9i","gameweek":1, "homeScore": 0, "awayScore": 0},
      "n1h64g": {"home":"Stoke City ","away":"Aston Villa","date":"2014-08-16","time":"15:00","id":"n1h64g","gameweek":1, "homeScore": 0, "awayScore": 0},
      "ht0on": {"home":"West Bromwich Albion ","away":"Sunderland","date":"2014-08-16","time":"15:00","id":"ht0on","gameweek":1, "homeScore": 0, "awayScore": 0},
      "eo8aq8": {"home":"West Ham United ","away":"Tottenham Hotspur","date":"2014-08-16","time":"15:00","id":"eo8aq8","gameweek":1, "homeScore": 0, "awayScore": 0},
      "1f1bbm": {"home":"Arsenal ","away":"Crystal Palace","date":"2014-08-16","time":"17:30","id":"1f1bbm","gameweek":1, "homeScore": 0, "awayScore": 0},
      "kklua9": {"home":"Liverpool ","away":"Southampton","date":"2014-08-17","time":"13:30","id":"kklua9","gameweek":1, "homeScore": 0, "awayScore": 0},
      "axjwnf": {"home":"Newcastle United ","away":"Manchester City","date":"2014-08-17","time":"16:00","id":"axjwnf","gameweek":1, "homeScore": 0, "awayScore": 0},
      "oegu8k": {"home":"Burnley ","away":"Chelsea","date":"2014-08-18","time":"20:00","id":"oegu8k","gameweek":1, "homeScore": 0, "awayScore": 0}
    }
  };
  console.log(fixtures);
  test.set(fixtures);
}