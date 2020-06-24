import React from 'react';
import './App.css';
import firebase from './firebase'
import NewGoals from './NewGoals';
import ChooseTask from './ChooseTask'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      choosingGoals: false,
      choosingTask: false,
      userNames: "",
      currentUN: "",
      goals: {},
      numberOfGoals: 5,
    }
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();
    dbRef.once('value', (response) => {

        const data = response.val();
        const newState = Object.keys(data)

        this.setState({
            userNames: newState
        })
    })
  }
  
  handleChangeUN = (event) => {
    this.setState({
        currentUN: event.target.value
    })
  }

  login = (event) => {
    event.preventDefault();
    const userNames = this.state.userNames
    const un = this.state.currentUN
    const dbRef = firebase.database().ref(this.state.currentUN)
    if (userNames.includes(un)){
        alert('Welcome back!')
        if (this.state.numberOfGoals > 3){
          this.setState({
            choosingTask:true
          })
        }
    } else {
        alert('I see you are new here, welcome!')
        this.setState({
          choosingGoals:true
        })
        //creates object in firebase with the un as the key
        dbRef.set('')
    }

    this.setState({
      isLoggedIn: true
    })

    dbRef.on('value', (response) =>{
      this.setState({
        numberOfGoals: Object.keys(response.val()).length,
      })

  }); 
  }

  checkTaskCount = () => {
    console.log('yepppeeeee')
    if (this.state.numberOfGoals <= 3){
      this.setState({
        choosingTask: false,
        choosingGoals: true
      })
      console.log('should change')
    }
  }
  

  logout = (event) => {
    event.preventDefault();
    this.setState({
      isLoggedIn: false
    })
  }

  selectChooseTask = (event) => {
    event.preventDefault();
    this.setState({
      choosingGoals: false,
      choosingTask: true
    })
  }

  render() {
    if (this.state.isLoggedIn === false) {
      return (
        <div className = "centered">
          <header>
            <h1>Let's Get Productive!</h1>
          </header>
          <form className = "loginForm">
              <input type="text" placeholder="Username" value={this.state.userName} onChange={this.handleChangeUN} required/>
              <button type="submit" onClick={this.login}>Login</button>
          </form>
        </div>
      )
    }
    // if (this.state.numberOfGoals < 3) {
    //   return (
    //     <div>
    //       <NewGoals un={this.state.currentUN} numberOfGoals={this.state.numberOfGoals} goals={this.state.goals} selectChooseTask={this.selectChooseTask}/>
    //       <button onClick={this.logout}>Logout</button>
    //     </div>
    //   )
    // }
    // else 
    if (this.state.choosingGoals){
      return (
        <div className="centered">
          <NewGoals un={this.state.currentUN} numberOfGoals={this.state.numberOfGoals} goals={this.state.goals} selectChooseTask={this.selectChooseTask}/>
          <button onClick={this.logout}>Logout</button>
        </div>
      )
    }
    
    if (this.state.choosingTask) {
      return <ChooseTask checkTaskCount={this.checkTaskCount} un={this.state.currentUN} goals={this.state.goals}/>
    }
  }

}

export default App