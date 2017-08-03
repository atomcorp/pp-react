import React, {Component} from 'react';

export default function UserPage(props) {
  console.log(props)
  return(
    <div class="user">
      <h1>User page</h1>
      <div className="user__name">Name: { props.user.name }</div>
      <div className="user__team">Team : { props.user.team }</div>
      <div className="user__points">Points : { props.user.points }</div>
    </div>
  );
}