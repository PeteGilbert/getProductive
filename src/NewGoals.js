import React from 'react';
import firebase from './firebase';
import ShowGoals from './ShowGoals';


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
    }

    handleChangeName = (event) => {
        console.log(event.target.value)
        this.setState({
            newGoal: event.target.value
        })
    }

    handleChangePhys = (event) => {
        this.setState({
            physical: event.target.value
        })
    }

    handleChangeMent = (event) => {
        this.setState({
            mental: event.target.value
        })
    }

    handleChangeEnergy = (event) => {
        this.setState({
            energy: event.target.value
        })
    }


    render () {
        return (
            <div className="centered">
                <h2>I'm going to need at least 3 goals in order to recommend a task for you!</h2>
                <form className="newGoalsForm">
                    <input type="text" placeholder="Enter your goal here!" value={this.state.newGoal} onChange={this.handleChangeName}/>

                    <div className="inputPair">
                        <label htmlFor="physical">How physically demanding is this goal?</label>
                        <input type="range" min="0" max="10" name="physical" value={this.state.physical} onChange={this.handleChangePhys}/>
                    </div>

                    <div className="inputPair">
                        <label htmlFor="mental">How mentally demanding is this goal?</label>
                        <input type="range" min="0" max="10" name="mental" value={this.state.mental} onChange={this.handleChangeMent}/>
                    </div>

                    <div className="inputPair">
                        <label htmlFor="energy">How tiring is this goal?</label>
                        <input type="range" min="0" max="10" name="energy" value={this.state.energy} onChange={this.handleChangeEnergy}/>
                    </div>
                </form>
                <button onClick={this.addGoal}>Add Goal</button>
                <button onClick={this.props.selectChooseTask}>Choose a Task</button>
                <ShowGoals un={this.props.un} />
            </div>
        )
            
    }
}

export default NewGoals