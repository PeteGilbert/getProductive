import React from 'react';
import './App.css';
import firebase from './firebase'
import NewGoals from './NewGoals';
import ChooseTask from './ChooseTask'


//Removed authentication as per Juno notes to not include for projects
//Choosing goal currently takes an extra click as a stretch goal was to allow the user to manually select a goal or skip the recommended, I started but did not finish this feature in time.

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      choosingGoals: false,
      choosingTask: false,
      userNames: "",
      currentUN: "",
      numberOfGoals: 5,
    }
  }

  //Gets list of usernames from firebase in order to compare user to list (this would normally be replaced by an auth)
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

    //Wrapped in an if statement to prevent error when user leaves username blank
    if (this.state.currentUN !== ""){
      event.preventDefault();
      const userNames = this.state.userNames
      const un = this.state.currentUN
      const dbRef = firebase.database().ref(this.state.currentUN)

      //Greets user and renders choosingGoals component
      if (userNames.includes(un)){
          alert('Welcome back!')
          this.setState({
            choosingGoals:true
          })
      } else {
          alert('I see you are new here, welcome!')
          this.setState({
            choosingGoals:true
          })
          //creates object in firebase with the un as the key
          dbRef.set('')
      }

      //Removes login form
      this.setState({
        isLoggedIn: true
      })

      //Tracks how many goals there are in the user's object in Firebase
      dbRef.on('value', (response) =>{
        this.setState({
          numberOfGoals: Object.keys(response.val()).length,
        })

      }); 
    }else {
      alert('Please enter your name!')
    }
  }

  //Used to switch between active components
  selectActive = (event) => {
    event.preventDefault();
      this.setState({
        choosingGoals: false,
        choosingTask: false,
        [event.target.name]: true
      })
  }
  //If there are less than 3 goals currently in firebase it forces user to add another. 
  checkTaskCount = () => {
    if (this.state.numberOfGoals <= 3){
      this.setState({
        choosingTask: false,
        choosingGoals: true
      })
    }
  }

  render() {
    if (this.state.isLoggedIn === false) {
      return (
        <div className = "centered">
          <header>
            <h1>Let's Get Productive!</h1>
          </header>
          <form className = "loginForm">
              <input aria-label="Username" type="text" placeholder="Username" value={this.state.currentUN} onChange={this.handleChangeUN} required/>
              <button type="submit" onClick={this.login}>Login</button>
          </form>
        </div>
      )
    }
    if (this.state.choosingGoals){
      return <NewGoals un={this.state.currentUN} numberOfGoals={this.state.numberOfGoals} goals={this.state.goals} selectActive={this.selectActive}/>
  
    }
    if (this.state.choosingTask) {
      return <ChooseTask checkTaskCount={this.checkTaskCount} selectActive={this.selectActive} un={this.state.currentUN} goals={this.state.goals}/>
    }
  }

}

export default App