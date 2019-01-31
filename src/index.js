import React from 'react';
import ReactDOM from 'react-dom';



//now I am writing class component
class App extends React.Component {
    render() {

        window.navigator.geolocation.getCurrentPosition(
            (position) => console.log(position),
            (err) => console.log(err)
        )
        
        return(
            <div>
                Latitude:
            </div>
        );
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#root')
);