import React from 'react';
import firebase from './firebase';
import ShowGoals from './ShowGoals';

//Allows the user to populate firebase with goals

class NewGoals extends React.Component {
    constructor() {
        super()
        this.state = {
            newGoal: "",
            physical: 0,
            mental: 0,
            energy: 0,
        }
    }

    addGoal = () => {
        if (this.state.newGoal !== ""){
            //push goal object to FB
            const dbRef = firebase.database().ref(this.props.un)
            let goal = {
                name: this.state.newGoal,
                physical: this.state.physical,
                mental: this.state.mental,
                energy: this.state.energy,
            }
            dbRef.child(this.state.newGoal).set(goal)
            this.setState({
                newGoal: "",
                physical: 0,
                mental: 0,
                energy: 0,
            })
        }else{
            alert('Please enter a name for your goal!')
        }
    }

    handleChange = (event) => {
        this.setState ({
            [event.target.name]: event.target.value
        })
    }


    render () {
        let button;
        let instructions;
        // only renders the button that allows users to choose a task when they have 3 or more goals stored in Firebase.
        if (this.props.numberOfGoals > 2){
            button = <button name="choosingTask" onClick={this.props.selectActive}>Choose Task</button>
            instructions = <h2>You can either add more goals or click the Choose Task button to have a task selected for you!</h2>
        }else{
            instructions = <h2>I'm going to need at least 3 goals in order to recommend a task for you!</h2>
        }

        return (
            <div className="centered">
                {instructions}
                <form className="newGoalsForm">
                    <input aria-label="Enter your goal here" type="text" placeholder="Enter your goal here!"  name="newGoal" onChange={this.handleChange} value={this.state.newGoal}/>

                    <div className="inputPair">
                        <label htmlFor="physical">How physically demanding is this goal?</label>
                        <input type="range" min="0" max="10" name="physical"  onChange={this.handleChange} value={this.state.physical}/>
                    </div>

                    <div className="inputPair">
                        <label htmlFor="mental">How mentally demanding is this goal?</label>
                        <input type="range" min="0" max="10" name="mental" onChange={this.handleChange} value={this.state.mental}/>
                    </div>

                    <div className="inputPair">
                        <label htmlFor="energy">How tiring is this goal?</label>
                        <input type="range" min="0" max="10" name="energy" onChange={this.handleChange} value={this.state.energy}/>
                    </div>
                </form>
                <button onClick={this.addGoal}>Add Goal</button>
                {button}
                <ShowGoals un={this.props.un} />
            </div>
        )
            
    }
}

export default NewGoals