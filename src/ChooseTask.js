import React from 'react';
import firebase from './firebase';
import ShowGoals from './ShowGoals';

//Displays goals and compares users current mood to the requirements of each goal to suggest which is most appropriate.

class ChooseTask extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goals: [],
            showForm: false,
            currentPhys: 0,
            currentMent: 0,
            currentEnergy: 0,
            bestOption: '',
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref(this.props.un)
        
        dbRef.on('value', (response) => {
            const newState = [];
            const data = response.val();
            let arr = Object.values(data)
            arr.forEach((obj) => {
                newState.push({
                    name: obj.name,
                    physical: obj.physical,
                    mental: obj.mental,
                    energy: obj.energy,
                })
            })
            this.setState({
                goals: newState
            })
        })
    }

    showForm = (event) => {
        event.preventDefault();
        this.setState ({
            showForm: true
        })
    }
    
    submit = (event) => {
        event.preventDefault();
        this.setState ({
            showForm: false
        })
        let winner = ''

        //math.abs gives absolute value so we can track difference regardless of more or less energy currently
        this.state.goals.forEach((obj) => {
            let x = 0
            let currentBestVal = 1000
            let currentBestName = ''
            x = x + Math.abs(obj.physical - this.state.currentPhys) 
            x = x + Math.abs(obj.mental - this.state.currentMent)
            x = x + Math.abs(obj.energy - this.state.currentEnergy)
            if (x < currentBestVal){
                currentBestVal = x
                currentBestName = obj.name
            }
            winner = currentBestName
            console.log('loop')
        })
        this.setState ({
            bestOption: winner
        })
        console.log('done')
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    //Removes completed tasks from FB also pushes user to add more goals if they are now below 3
    complete = () => {
        const dbRef = firebase.database().ref(this.props.un)
        dbRef.child(this.state.bestOption).remove();
        this.setState ({
            bestOption: ''
        })
        this.props.checkTaskCount()
    }

    render(){
        if (this.state.showForm){
            return (
                <form className="centered">
                    <h2>How Are you Feeling Now?</h2>

                    <div className="inputPair">
                        <label htmlFor="physical">How physically energized are you?</label>
                        <input type="range" min="0" max="10" name="currentPhys" value={this.state.currentPhys} onChange={this.handleChange}/>
                    </div>

                    <div className="inputPair">
                        <label htmlFor="mental">How mentally energized are you?</label>
                        <input type="range" min="0" max="10" name="currentMent" value={this.state.currentMent} onChange={this.handleChange}/>
                    </div>

                    <div className="inputPair">
                        <label htmlFor="energy">How much energy do you have?</label>
                        <input type="range" min="0" max="10" name="currentEnergy" value={this.state.currentEnergy} onChange={this.handleChange}/>
                    </div>
                    <button onClick={this.submit}>Submit</button>
                </form>
            )
        //This only fires when displaying the user the suggested task... Was looking to add skip button here as well as a stretch goal but ran out of time.
        }else if (this.state.bestOption !== ''){
            return (
                <div className="centered">
                    <p>The most suitable task for you currently is:</p>
                    <h2>{this.state.bestOption}</h2>
                    <button onClick={this.complete}>Mark Task as Complete</button>
                </div>
            )
        }
        return (
            <div className="centered">
                <button onClick={this.showForm}>Choose a task for me!</button>
                <button name="choosingGoals" onClick={this.props.selectActive}>Add more goals!</button>
                <ShowGoals un={this.props.un} />
            </div>

        )
    }
}

export default ChooseTask