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

        var value = target.id

        var stops = this.state.stops;

        switch (value) {
            case 'zeroStops':
                if (!stops.has(0)) {
                    stops.add(0);
                } else {
                    stops.delete(0);
                }

                break;
            case 'oneStop':
                if (!stops.has(1)) {
                    stops.add(1);
                } else {
                    stops.delete(1);
                }

                break;
            case 'twoStops':
                if (!stops.has(2)) {
                    stops.add(2);
                } else {
                    stops.delete(2);
                }

                break;
            case 'threeStops':
                if (!stops.has(3)) {
                    stops.add(3);
                } else {
                    stops.delete(3);
                }

                break;
            default:
                if (![0, 1, 2, 3].every(value => this.state.stops.has(value))) {
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
            <div class='tickets-list'>
                <div className='filter-stop-quantity'>
                    <h1 class='filter-title'>КОЛИЧЕСТВО ПЕРЕСАДОК</h1>
                    <div className='filter-cell' id='allStops' onClick={this.handleInputChange} value=''>
                        <input checked={[0, 1, 2, 3].every(value => this.state.stops.has(value))} type='checkbox'/>
                        <label class='filter-cell-title'>Все</label>
                    </div>
                    <div className='filter-cell' id='zeroStops' onClick={this.handleInputChange} value='0'>
                        <input checked={this.state.stops.has(0)} type='checkbox'/>
                        <label class='filter-cell-title'>Без пересадок</label>
                    </div>
                    <div className='filter-cell' id='oneStop' onClick={this.handleInputChange} value='1'>
                        <input checked={this.state.stops.has(1)} type='checkbox'/>
                        <label class='filter-cell-title'>1 пересадка</label>
                    </div>
                    <div className='filter-cell' id='twoStops' onClick={this.handleInputChange} value='2'>
                        <input checked={this.state.stops.has(2)} type='checkbox'/>
                        <label class='filter-cell-title'>2 пересадки</label>
                    </div>
                    <div className='filter-cell' id='threeStops' onClick={this.handleInputChange} value='3'>
                        <input checked={this.state.stops.has(3)} type='checkbox'/>
                        <label class='filter-cell-title'>3 пересадки</label>
                    </div>
                </div>
                <div>
                    {ticketsData.tickets.filter( function(value) {
                        return self.state.stops.has(value.stops);
                    }).sort((a, b) => a.price > b.price).map(ticket => this.renderTicket(ticket))}
                </div>
            </div>
        );
    }
}

class TicketsView extends React.Component {
    render() {
        return(
            <div>
                <div className='logo'></div>
                <TicketsList />
            </div>
        );
    }
}

ReactDOM.render(<TicketsView />, document.getElementById('root'));
