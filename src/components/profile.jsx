import React from 'react';

export default function Profile(props) {

  return(
    <div className="profile">
      <h1>User page</h1>
      <div className="user__name">Name: { props.player.name }</div>
      <div className="user__team">Team : { props.player.team }</div>
      <div className="user__points">Points : { props.player.points }</div>
    </div>
  );
}