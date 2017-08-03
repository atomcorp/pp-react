import React, {Component} from 'react';

export default function UserPage(props) {
  console.log(props)
  return(
    <div>{ props.user.name }</div>
  );
}