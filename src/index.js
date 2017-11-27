import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

global.React = React;
global.ReactDOM = ReactDOM;

const ticketsData = require('./tickets.json');

const TicketCell = function (props) {
  const ticket = props.ticket;

  return (
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
};

class TicketsList extends React.Component {
  constructor(props) {
    super(props);

    const stops = new Set();
    stops.add(0);
    stops.add(1);
    stops.add(2);
    stops.add(3);
    this.state = { stops };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    const targetId = target.id;

    const stops = this.state.stops;

    switch (targetId) {
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
    this.setState({ stops });
  }

  renderTicket(ticket) {
    return <TicketCell ticket={ticket} />;
  }

  render() {
    const self = this;

    const filteredTickets = ticketsData.tickets.filter((value) => {
      const {stops} = value;

      return self.state.stops.has(stops);
    });
    const sortedTickets = filteredTickets.sort((a, b) => a.price > b.price);

    return (
      <div className="tickets-list">
        <div className="filter-stop-quantity">
          <h1 className="filter-title">КОЛИЧЕСТВО ПЕРЕСАДОК</h1>
          <div className="filter-cell" />
          {/* <label className='filter-cell' id='allStops' onClick={this.handleInputChange}>
                        <div class={[0, 1, 2, 3].every(value => this.state.stops.has(value)) ? 'filter-cell-checkbox-checked' : 'filter-cell-checkbox'}></div>
                        <div class='filter-cell-title'>Все</div>
                    </label>
                    <div className='filter-cell' id='zeroStops' onClick={this.handleInputChange}>
                        <div class={this.state.stops.has(0) ? 'filter-cell-checkbox-checked' : 'filter-cell-checkbox'}></div>
                        <label class='filter-cell-title'>Без пересадок</label>
                    </div>
                    <div className='filter-cell' id='oneStop' onClick={this.handleInputChange}>
                        <div class={this.state.stops.has(1) ? 'filter-cell-checkbox-checked' : 'filter-cell-checkbox'}></div>
                        <label class='filter-cell-title'>1 пересадка</label>
                    </div>
                    <div className='filter-cell' id='twoStops' onClick={this.handleInputChange}>
                        <div class={this.state.stops.has(2) ? 'filter-cell-checkbox-checked' : 'filter-cell-checkbox'}></div>
                        <label class='filter-cell-title'>2 пересадки</label>
                    </div>
                    <div className='filter-cell' id='threeStops' onClick={this.handleInputChange}>
                        <div class={this.state.stops.has(3) ? 'filter-cell-checkbox-checked' : 'filter-cell-checkbox'}></div>
                        <label class='filter-cell-title'>3 пересадки</label>
                    </div> */}
        </div>
        <div>
          {
            sortedTickets.map((ticket) => {
              return this.renderTicket(ticket);
            })
          }
        </div>
      </div>
    );
  }
}

const TicketsView = function TicketsView() {
  return (
    <div>
      <div className="logo" />
      <TicketsList />
    </div>
  );
};

ReactDOM.render(
    <Provider store={store}>
        <TicketsView />
    </Provider>, document.getElementById('root')
);
