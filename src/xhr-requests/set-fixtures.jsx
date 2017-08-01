import React, {Component} from 'react';
import firebase from '../firebase';

const test = firebase.database().ref('14-15/gameweek1/');
export default function SetFixtures(props) {
  const fixtures = [
    {"home":"Manchester United ","away":"Swansea City","date":"2014-08-16","time":"12:45","id":1,"gameweek":1, "homeScore": 0, "awayScore": 0},
    {"home":"Leicester City ","away":"Everton","date":"2014-08-16","time":"15:00","id":2,"gameweek":1, "homeScore": 0, "awayScore": 0},
    {"home":"Queens Park Rangers ","away":"Hull City","date":"2014-08-16","time":"15:00","id":3,"gameweek":1, "homeScore": 0, "awayScore": 0},
    {"home":"Stoke City ","away":"Aston Villa","date":"2014-08-16","time":"15:00","id":4,"gameweek":1, "homeScore": 0, "awayScore": 0},
    {"home":"West Bromwich Albion ","away":"Sunderland","date":"2014-08-16","time":"15:00","id":5,"gameweek":1, "homeScore": 0, "awayScore": 0},
    {"home":"West Ham United ","away":"Tottenham Hotspur","date":"2014-08-16","time":"15:00","id":6,"gameweek":1, "homeScore": 0, "awayScore": 0},
    {"home":"Arsenal ","away":"Crystal Palace","date":"2014-08-16","time":"17:30","id":7,"gameweek":1, "homeScore": 0, "awayScore": 0},
    {"home":"Liverpool ","away":"Southampton","date":"2014-08-17","time":"13:30","id":8,"gameweek":1, "homeScore": 0, "awayScore": 0},
    {"home":"Newcastle United ","away":"Manchester City","date":"2014-08-17","time":"16:00","id":9,"gameweek":1, "homeScore": 0, "awayScore": 0},
    {"home":"Burnley ","away":"Chelsea","date":"2014-08-18","time":"20:00","id":10,"gameweek":1, "homeScore": 0, "awayScore": 0}
  ];
  test.set(fixtures);
  return <div>Set</div>
}