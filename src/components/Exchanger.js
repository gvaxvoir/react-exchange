import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import createReactClass from 'create-react-class';

class Exchanger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
        }
    }

    componentDidMount() {
        const objThis = this;
        fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then((response) => response.json())
            .then((findresponse) => {
                console.log(Object.values(findresponse))
                this.setState({
                    currencies: findresponse,
                })
            })
    };

    handleClick(e: React.FormEvent) {
        var stRate, fnRate, sum, amt;
        stRate = parseFloat(document.getElementById('start-cur').options[document.getElementById('start-cur').selectedIndex].getAttribute('data-rate'));
        fnRate = parseFloat(document.getElementById('finish-cur').options[document.getElementById('finish-cur').selectedIndex].getAttribute('data-rate'));
        sum    = parseFloat(document.getElementById('sum').value);
        amt    = sum * stRate / fnRate;
        console.log(stRate, fnRate, sum, amt)
        document.getElementById("amt").value = amt;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div>
                            <label htmlFor="stCurr">Choose your currency:</label>
                            <select name="start-cur" id="start-cur" onChange={this.handleClick}>
                                {this.state.currencies.map((stCurr, index) => {
                                    return (
                                    <option  key={`${stCurr.cc}`} data-rate={stCurr.rate} >
                                        {stCurr.cc} - {stCurr.txt}
                                    </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="finCurr">Choose new currency:</label>
                            <select name="finish-cur" id="finish-cur" onChange={this.handleClick}>
                                {this.state.currencies.map((finCurr, index) => {
                                    return (
                                        <option key={`${finCurr.cc}`} data-rate={finCurr.rate}>
                                            {finCurr.cc} - {finCurr.txt}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <input type="number" min="0" id="sum" placeholder="0" onChange={this.handleClick} />
                        <button onChange={this.handleClick} disabled>Calc!</button>
                    </div>
                    <div className="col-md-4">
                        <input type="number" min="0" id="amt" placeholder="0" disabled />
                    </div>
                </div>
            </div>
        );
    }
}

export default Exchanger;
