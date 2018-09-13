import React, { Component } from 'react';
import './HomeButton.css';
import App from '../App';

class HomeButton extends Component {

    constructor(props) {
        super(props);
        this.handleHome = this.handleHome.bind(this);
        this.state = {
          home: false,
        };
      }

handleHome = () => {
    this.setState({ home: true });
}

    render() {
        const home = this.state.home;

        if(home){
            return(
                <App/>
            );
        }

        return (
            <div onClick={this.handleHome} className="homeButtonDiv">
            <a href="" className="homeButtonSymbol">⌂</a>
            </div>
        );

    }
}

export default HomeButton;