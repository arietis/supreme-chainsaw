import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
const ticketsData = require('./tickets.json');

class TicketCell extends React.Component {
    render() {
        var ticket = this.props.ticket;

        return(
            <div className="ticket-cell">
                <div>Origin: {ticket.origin}</div>
                <div>{ticket.origin_name}</div>
                <div>Destination: {ticket.destination}</div>
                <div>{ticket.destination_name}</div>
                <div>Departure: {ticket.departure_date}</div>
                <div>{ticket.departure_time}</div>
                <div>Arrival: {ticket.arrival_date}</div>
                <div>{ticket.arrival_time}</div>
                <div>Carrier: {ticket.carrier}</div>
                <div>Stops: {ticket.stops}</div>
                <div>Price: {ticket.price}</div>
            </div>
        );
    }
}

class TicketsList extends React.Component {
    constructor(props) {
        super(props);

        var stops = new Set();
        stops.add(0);
        stops.add(1);
        stops.add(2);
        stops.add(3);
        this.state = {stops: stops};
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        var target = event.target

        var checked = target.checked;

        var value = target.value

        var stops = this.state.stops;
        switch (value) {
            case '0':
                if (checked) {
                    stops.add(0);
                } else {
                    stops.delete(0);
                }
                break;
            case '1':
                if (checked) {
                    stops.add(1);
                } else {
                    stops.delete(1);
                }
                break;
            case '2':
                if (checked) {
                    stops.add(2);
                } else {
                    stops.delete(2);
                }
                break;
            case '3':
                if (checked) {
                    stops.add(3);
                } else {
                    stops.delete(3);
                }
                break;
            default:
                if (checked) {
                    stops.add(0);
                    stops.add(1);
                    stops.add(2);
                    stops.add(3);
                } else {
                    stops.clear();
                }
                break;
        }
        this.setState({stops: stops});
    }

    renderTicket(ticket) {
        return <TicketCell ticket={ticket}/>
    }

    render() {
        var self = this;

        return(
            <div>
                <fieldset>
                    <input checked={[0, 1, 2, 3].every(value => this.state.stops.has(value))} id='allStops' onChange={this.handleInputChange} type='checkbox' value=''/>
                    <label for='allStops'>All</label>
                    <br/>
                    <input checked={this.state.stops.has(0)} id='zeroStops' onChange={this.handleInputChange} type='checkbox' value='0'/>
                    <label for='zeroStops'>No stops</label>
                    <br/>
                    <input checked={this.state.stops.has(1)} id='oneStop' onChange={this.handleInputChange} type='checkbox' value='1'/>
                    <label for='oneStop'>1 stop</label>
                    <br/>
                    <input checked={this.state.stops.has(2)} id='twoStops' onChange={this.handleInputChange} type='checkbox' value='2'/>
                    <label for='twoStops'>2 stops</label>
                    <br/>
                    <input checked={this.state.stops.has(3)} id='threeStops' onChange={this.handleInputChange} type='checkbox' value='3'/>
                    <label for='threeStops'>3 stops</label>
                </fieldset>
                <div>
                    {ticketsData.tickets.filter( function(value) {
                        return self.state.stops.has(value.stops);
                    }).sort((a, b) => a.price > b.price).map(ticket => this.renderTicket(ticket))}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<TicketsList />, document.getElementById('root'));
