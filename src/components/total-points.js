// 3 possibilites: predicted, not predicted, ...

// get total matchdays
// get current gameweek
// check 2017computed/uid/gameweeks prior to current gameweek (req)
// if any false collect ids (eg gameweek4)
//  check the gameweek predictions (eg 2017-gameweek4/uid) (req)
//    if empty, mark '2017computed' true and score 0 points (req)
//    else, calculate the result, update '2017results' and mark '2017computed' true (req)
//      check '2017results' (req)
//      if not populated, add data from football api  (req)
//      else pull in
// if any true, ignore
// update users score (req)

export default function TotalPoints(uid) {
  console.log('Alive', uid);
}