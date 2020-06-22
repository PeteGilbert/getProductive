import React from 'react';
import './App.css';
import Login from './Login';
import NewGoals from './NewGoals';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      choosingGoals: false,
      choosingTask:false,
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Let's Get Productive!</h1>
          <Login />
          <NewGoals />
        </header>
      </div>
    );
  }
}

export default App;
