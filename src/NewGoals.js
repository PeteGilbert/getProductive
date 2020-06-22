import React from 'react';

class NewGoals extends React.Component {
    constructor() {
        super()
        this.state = {
            xxx: 0
        }
    }

    render () {
        return (
            <div className="newGoals">
                <h2>I'm going to need some goals in order to recommend a task for you!</h2>
                <form>
                    <input type="text" placeholder="Enter your goal here!"/>
                    <label for="physical">How physically demanding is this goal?</label>
                    <input type="range" min="0" max="10" name="physical"/>

                    <label for="mental">How physically demanding is this goal?</label>
                    <input type="range" min="0" max="10" name="mental"/>

                    <label for="energy">How physically demanding is this goal?</label>
                    <input type="range" min="0" max="10" name="energy"/>
                </form>
            </div>
        )
    }
}

export default NewGoals