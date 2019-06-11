import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles.css';
import * as actions from './actions';
import auth from '../../infrastructure/auth';
import GoogleMapReact, { Point } from 'google-map-react';
import logo from '../../assets/logo.png';

const Tooltip = ({ title, description, rating }) =>
  <div className="card" style={{ width: "18rem" }}>
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <p className="card-text">Rating: {rating}</p>
      <a href="#" className="btn btn-primary">Show details</a>
    </div>
  </div>;

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
    ;

    return ('0' + a.getDate()).slice(-2) + '/'
      + ('0' + (a.getMonth() + 1)).slice(-2) + '/'
      + a.getFullYear() + ' '
      + ('0' + a.getHours()).slice(-2) + ':'
      + ('0' + a.getMinutes()).slice(-2) + " (" + Intl.DateTimeFormat().resolvedOptions().timeZone + " Timezone)";


    // let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // let year = a.getFullYear();
    // let month = months[a.getMonth()];
    // let date = a.getDate();
    // let hour = a.getHours();
    // let min = a.getMinutes();
    // let sec = a.getSeconds();
    // let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    // return time;
  }

  render() {
    const average = this.props.event.rating.average;

    return (<div className="container">
      {this.props.isBusy && <div id="myNav" className="overlay">
        <div className="overlay-content">
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ width: "100px", height: "100px" }} />
          <p className="mt-2 mb-2">Loading...</p>
        </div>
      </div>}
      {!this.props.isBusy && <div>
        <div className="block mt-2 mb-2">
          <h2>{this.props.event.name}</h2>
        </div>
        <div className="block mt-2 mb-2">
          <h4>Average user rating</h4>
          <span className="glyphicon glyphicon-star" aria-hidden="true" />
          <small>Total votes: {this.props.event.rating.count}</small>
          <h2 className="bold padding-bottom-7">{this.props.event.rating.average} <small>/ 5</small></h2>

          {this.props.event.rating.rated && <span>You already voted for this event</span>}
          {!this.props.event.rating.rated && <span>Please take your vote</span>}
          {!this.props.event.rating.rated && <div>
            <button type="button" className={this.getVoteButtonStyles(average, 1)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(1)} aria-label="Left Align"> 1</button>
            <button type="button" className={this.getVoteButtonStyles(average, 2)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(2)} aria-label="Left Align"> 2</button>
            <button type="button" className={this.getVoteButtonStyles(average, 3)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(3)} aria-label="Left Align"> 3</button>
            <button type="button" className={this.getVoteButtonStyles(average, 4)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(4)} aria-label="Left Align"> 4</button>
            <button type="button" className={this.getVoteButtonStyles(average, 5)} disabled={this.props.event.rating.rated} onClick={() => this.props.vote(5)} aria-label="Left Align"> 5</button>
          </div>}
        </div>
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
      </div>}
    </div>);
  }
}

EventDetailsPage.propTypes = {
  getDetails: PropTypes.func.isRequired,
  vote: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  isBusy: state.EventDetailsPage.isBusy,
  event: state.EventDetailsPage.event
});

const mapDispatchToProps = (dispatch) => ({
  getDetails: (id) => dispatch(actions.onGetDetails(id)),
  vote: (rate) => dispatch(actions.onVote(rate))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailsPage);