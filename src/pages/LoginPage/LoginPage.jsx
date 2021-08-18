import React from 'react';
import { Link } from 'react-router-dom';

export default class LoginPage extends React.Component {
  render() {
    return (
      <Link to="/chat">Перейти в чат</Link>
    )
  }
}