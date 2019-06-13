import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';
import * as actions from './actions';
import auth from '../../infrastructure/auth';
import GoogleMapReact, { Point } from 'google-map-react';
import { NavigationBottom } from '../../components/NavigationBottom';
import { BusyIndicator } from '../../components/BusyIndicator';
import logo from '../../assets/logo.png';

class EventDetailsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    auth.navigateToLoginIfNotAuthericated();

    console.log(JSON.stringify());

    this.props.getDetails(this.props.match.params.id);
  }

  getVoteButtonStyles = (currentAverage, minAverage) => {
    if (currentAverage >= minAverage) {
      return "btn btn-warning btn-sm btn-vote";
    } else {
      return "btn btn-default btn-grey btn-sm btn-vote";
    }
  }

  formatTimestamp(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);

    return ('0' + a.getDate()).slice(-2) + '/'
      + ('0' + (a.getMonth() + 1)).slice(-2) + '/'
      + a.getFullYear() + ' '
      + ('0' + a.getHours()).slice(-2) + ':'
      + ('0' + a.getMinutes()).slice(-2) + " (" + Intl.DateTimeFormat().resolvedOptions().timeZone + " Timezone)";
  }

  render() {
    const average = this.props.event.rating.average;

    return (<div className="container">
      <NavigationBottom />
      {this.props.isBusy && <BusyIndicator text={"Loading..."} />}
      {!this.props.isBusy &&
        <div className="mb-4">
          <div className="block mt-2 mb-2">

            <dl className="row">
              <dt className="col-sm-3">Name</dt>
              <dd className="col-sm-9">{this.props.event.name}</dd>

              <dt className="col-sm-3">Description</dt>
              <dd className="col-sm-9">
                <p>{this.props.event.description}</p>
              </dd>

              <dt className="col-sm-3">Owner</dt>
              <dd className="col-sm-9">
                <p>{this.props.event.user.displayName}</p>
              </dd>

              <dt className="col-sm-3">Type</dt>
              <dd className="col-sm-9">
                <p>{this.props.event.type}</p>
              </dd>

              {this.props.event.type == 'event' && <dt className="col-sm-3">Date</dt>}
              {this.props.event.type == 'event' && <dd className="col-sm-9"><p>{this.formatTimestamp(this.props.event.date)}</p></dd>}

              <dt className="col-sm-12 text-truncate">Localization</dt>

              <dd className="col-sm-12">
                <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyAdyBU9OJSLdVFyJ4g4OWaTghDWNM1G5Tg" }}
                  defaultCenter={{
                    lat: this.props.event.localization.latitude,
                    lng: this.props.event.localization.longitude
                  }}
                  style={{ height: "200px", margin: "10px" }}
                  defaultZoom={11}
                >

                  <img src={logo} width="32" height="32" lat={this.props.event.localization.latitude}
                    lng={this.props.event.localization.longitude} />
                </GoogleMapReact>
              </dd>
            </dl>
          </div>
          <div className="block mt-2 mb-2">
            <h4>Weather</h4>
            <dl className="row">
              <dt className="col-sm-3">Temperature</dt>
              <dd className="col-sm-9"><p>{this.props.weather.temperature.temp}</p>
                <small>Min: {this.props.weather.temperature.min} / Max: {this.props.weather.temperature.max}</small></dd>

              <dt className="col-sm-3">Sky</dt>
              <dd className="col-sm-9">
                {this.props.weather.weather.main}
              </dd>
            </dl>
          </div>
          <div className="block mt-2 mb-5">
            <h4>Average user rating</h4>
            <small>Total votes: {this.props.event.rating.count}</small>
            <h2 className="bold padding-bottom-7">{this.props.event.rating.average} <small>/ 5</small></h2>

            {this.props.event.rating.rated && <span>You already voted for this event</span>}
            {!this.props.event.rating.rated && <span>Please take your vote</span>}
            <div>
              <button type="button" className={this.getVoteButtonStyles(average, 1)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(1)} aria-label="Left Align"> 1</button>
              <button type="button" className={this.getVoteButtonStyles(average, 2)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(2)} aria-label="Left Align"> 2</button>
              <button type="button" className={this.getVoteButtonStyles(average, 3)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(3)} aria-label="Left Align"> 3</button>
              <button type="button" className={this.getVoteButtonStyles(average, 4)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(4)} aria-label="Left Align"> 4</button>
              <button type="button" className={this.getVoteButtonStyles(average, 5)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(5)} aria-label="Left Align"> 5</button>
            </div>
          </div>
        </div>}
    </div>);
  }
}

EventDetailsPage.propTypes = {
  getDetails: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isBusy: state.EventDetailsPage.isBusy,
  event: state.EventDetailsPage.event,
  weather: state.EventDetailsPage.weather
});

const mapDispatchToProps = (dispatch) => ({
  getDetails: (id) => dispatch(actions.onGetDetails(id)),
  vote: (rate) => dispatch(actions.onVote(rate))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsPage);