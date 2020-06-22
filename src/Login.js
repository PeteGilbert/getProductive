import React from 'react';
import firebase from './firebase'
import NewGoals from './NewGoals'

class login extends React.Component  {
    constructor() {
        super();
        this.state = {
            userNames: "",
            currentUN: "",
        };
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();
    
        // Storing Usernames from DB to check if existing
        dbRef.on('value', (response) => {
    
            const newState = [];
            const data = response.val();
            for (let key in data) {
                newState.push(data[key]);
            }   
            

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
    
    // handleChangePW = (event) => {
    //     this.setState({
    //         password: event.target.value
    //     })
    // }


    handleClick = (event) => {
        event.preventDefault();
        const userNames = this.state.userNames
        const un = this.state.currentUN
        const dbRef = firebase.database().ref();

        if (userNames.includes(un)){
            alert('Welcome back!')
        } else {
            alert('I see you are new here, welcome!')
            dbRef.push(un)
        }
        return <NewGoals />
    }

    render() {
        return (
                <form className = "loginForm">
                    <input type="text" placeholder="Enter Username" required value={this.state.userName} onChange={this.handleChangeUN}/>
                    {/* <input type="password" placeholder="Enter Password" required value={this.state.password} onChange={this.handleChangePW}/> */}

                    <button type="submit" onClick={this.handleClick}>Login</button>
                </form>
        )
    }
}


export default login