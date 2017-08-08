import React from 'react';

export default function Profile(props) {
  console.log(props)
  return(
    <div className="profile">
      <h1>User page</h1>
      <div className="user__name">Name: { props.uid }</div>
      <div className="user__team">Team : </div>
      <div className="user__points">Points : </div>
    </div>
  );
}