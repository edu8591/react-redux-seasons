import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner'



//now I am writing class component

class App extends React.Component {
    //constructor is a function that is speecific to react
    //in classes the constructor function is the first thing that should be called
    //this object that is created with the constructor holds information or data that 
    //is important to the component ;
    //this initializes the state


    // constructor(props) {
        //     //we should always call these functions
        //     //our App component is extending or borrowing functionality from 
        //     //the react component base class, this base class has its own constructor function
        //     //that goes through some setup to set a react component, we are replaceing or
        //     //overwriting that constructor within react component, super is a reference to that parent's constructor
            //     super(props); //it is required to do this
        
        //     //to initialize the state project it is the state object that has information relevant to the component
            //     this.state = { lat: null, errorMessage: ''};
        //     /**
        //      * there is another way to initialize state because the alternate way
        //      * is a method that will be seen frequently
        //      * to get to it we will get to know a little about component lifecycle method
        //      * the lifecycle method is a function that we can optionally define within class based components
        //      * if we decide to implement these methods they will be called automatically by react during the component life's cycle
        //      * 
        //     */
        //     //when we initialize state a property insite a state object we must default it to a reasonable
        //     //or sensible value, if we dont know what the value will be yet it shoud be set to null
        //     //this is the only time we use a direct assignment to the state
    // }
    state = {lat: null, errorMessage: ''};//this is another way to set the state, instead of using the constructor function comented above

    componentDidMount() {
        //initial data loading request should be placed within componentDidMount
        //just because it is a best practice
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                //every time we update the state it should be done with the setState function or method
                //to update the state object we called seState, which is a function that gets put on
                //our app component automatically when we extended react.component
                this.setState({lat: position.coords.latitude });
                //WE DID NOT UPDATE STATE BY this.state.lat= position.coords.latitude
                //do not do that NEVER!! use a direct asigment
                //the only exceptio is when we initialize the state!!
            },
            (err) => {    
                this.setState({errorMessage: err.message});
            }
        );
    }


    renderContent() {
        if(this.state.errorMessage && !this.state.lat) {
            return(
                <div>
                    Error: {this.state.errorMessage}
                </div>
            );
        }

        if(!this.state.errorMessage && this.state.lat) {
            return(
                <div>
                    <SeasonDisplay lat={this.state.lat} />{/*state can also be set as props */}
                </div>
            );
        }

        return(
            <div>
                <Spinner message="Please click allow to continue" />
            </div>
        );
    }



    //the next 2 functions are lifecycle functions placed just to log something to the console
    //when they run
    // componentDidMount() {
    //     console.log('My component was redered to the screen');
    // }
    // componentDidUpdate() {
    //     console.log('My component was just updated-it rerendered!');
    // }


    // react says we have to define render!!!!
    render() {
        //the render method is used ONLY to return some jsx 
        return(
            <div>
                {this.renderContent()}
            </div> /**before the code for render content was inside the render method but in order to make it easier to maintain it was set to a helper function */
        );
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);


/**
 * rules of state
 * only use with class components (it can bee used with functional components if using hook system)
 * you will confuse props with state :(
 * 'state' is a JS objectthat contains some amount of data that is relevant to a component
 * updating 'state' on a component causes thee component to re render
 * state must be initialized when the component is creeated
 * state canb only be updated using the function 'setState'
*/