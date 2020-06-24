import React from 'react';
import firebase from './firebase';

class ShowGoals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            goals: [],
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