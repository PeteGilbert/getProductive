import React from 'react';
import firebase from './firebase';

//Renders a list of the goals within the current user's firebase object

class ShowGoals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goals: [],
        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref(this.props.un)
        this.ismounted = true
        //Pushing the name value within the firebase object to an array in state
        dbRef.on('value', (response) => {
            const newState = [];
            const data = response.val();
            let arr = Object.values(data)
            arr.forEach((obj) => {
                newState.push({
                    name: obj.name,
                })
            })
            //allows component unmount to prevent memory leak without turning off firebase
            if (this.ismounted){
                this.setState({
                    goals: newState
                })
            }
        })
    }

    // prevents memory leak
    componentWillUnmount() {
        this.ismounted = false
    }
    render() {
        return (
            <div>
                <h2>Current Goals:</h2>
                <ul className="goalContainer">
                    {this.state.goals.map((goal) => {
                        return (
                        <div className="goalDisplay" key ={goal.name}>
                            <h3>{goal.name}</h3>
                        </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ShowGoals;