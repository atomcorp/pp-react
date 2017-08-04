import React from 'react';

export default function Profile(props) {
  console.log(props)
  return(
    <div className="profile">
      <h1>User page</h1>
      <div className="user__name">Name: { props.user }</div>
      <div className="user__team">Team : { props.user.team }</div>
      <div className="user__points">Points : { props.user.points }</div>
    </div>
  );
}