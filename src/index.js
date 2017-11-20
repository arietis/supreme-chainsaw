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

        this.state = {stops: props.stops};
    }

    renderTicket(ticket) {
        return <TicketCell ticket={ticket}/>
    }

    render() {
        var self = this;

        return(
            <div>
                {ticketsData.tickets.filter( function(value) {
                    if (self.state.stops == null) {
                        return true;
                    }

                    return value.stops < self.state.stops;
                }).sort((a, b) => a.price > b.price).map(ticket => this.renderTicket(ticket))}
            </div>
        );
    }
}

var stops = 1;
ReactDOM.render(<TicketsList stops={stops}/>, document.getElementById('root'));
