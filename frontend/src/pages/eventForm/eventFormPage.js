import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import auth from '../../infrastructure/auth';

import PostForm from '../../components/Events/PostForm'

import * as actions from './actions';

class EventFormPage extends Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount() {
  //   auth.navigateToAppIfAuthericated();
  // }

  render() {
    return (

      <div style={{
        "display": "-ms-flexbox",
        "display": "-webkit-box",
        "display": "flex",
        "-ms-flex-align": "center",
        "-ms-flex-pack": "center",
        "-webkit-box-align": "center",
        "align-items": "center",
        "-webkit-box-pack": "center",
        "justify-content": "center",
        "padding-top": "40px",
        "padding-bottom": "40px",
        "background-color": "#f5f5f5",
        "height": "100%"
      }}>
        <div className="row">
          <div className="col-sm-12 col-md-12 text-center">        
            <h2>Add Event</h2>
            <PostForm
              name={this.props.name}
              description={this.props.description}
              longitude={this.props.longitude}
              latitude={this.props.latitude}
              type={this.props.type}
              handleSubmit={this.props.handleSubmit}
              formUpdate={this.props.formUpdate}
              isBusy={this.props.isBusy}           
              event={event}
              />          
          </div>
        </div>
      </div>
    )
  }

};

EventFormPage.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formUpdate: PropTypes.func.isRequired,
  isBusy: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  name: state.EventFormPage.name,
  description: state.EventFormPage.description,
  longitude: state.EventFormPage.longitude,
  latitude: state.EventFormPage.latitude,
  type: state.EventFormPage.type,
  isBusy: state.EventFormPage.isBusy
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (event) => dispatch(actions.onSubmitClick(event)),
  formUpdate: (field, event) => dispatch(actions.onFormUpdate(field, event))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventFormPage);