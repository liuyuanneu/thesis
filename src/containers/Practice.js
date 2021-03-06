import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { msEmotionReset }  from '../actions/action_msEmotion';
import { sttReset }  from '../actions/action_streamingstt';
import { transcriptionReset }  from '../actions/action_transcription';
import { StreamingSttResponse } from '../actions/action_streamingstt.js';
import { toneReset }  from '../actions/action_tone';
import TextBox from '../components/TextBox';
import Webcam from './Webcam';
import Chart from './Chart';
import Cloud from './Cloud';
import io from 'socket.io-client';

class Practice extends Component {
  static contextTypes = {
    user: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    const socket = io();
    socket.on('streamingSpeechToText',
      (data) => this.props.StreamingSttResponse(data, this.props.streamingStt)
    );
    this.state = {
      sessionTimestamp: Date.now(),
      sttSocket: socket
    };
  }

  componentWillMount() {
    this.props.msEmotionReset(null, this.props.msEmotion);
    this.props.socket.emit('sessionStart', {
      sessionTimestamp: this.state.sessionTimestamp,
      username: this.context.user.username
    });
  }

  componentWillUnmount() {
    this.props.msEmotionReset(null, this.props.msEmotion);
    this.props.sttReset();
    this.props.transcriptionReset();
    this.props.toneReset();
  }

  handleTextChange (event) {
    event.target.value;
  }

  render () {
    return (
    <div className="container">
      <h2> Practice </h2>
      <div className="row practice">
        <Webcam
          sessionTimestamp={this.state.sessionTimestamp}
          user={this.context.user}
          sttSocket={this.state.sttSocket}
        />
        <TextBox
          speechToText={this.props.speechToText}
          sessionTimestamp={this.state.sessionTimestamp}
          user={this.context.user}
        />
      </div>
      {!this.props.msEmotion.length && !this.props.transcription.length ?
        <div className="row">
          <h3><span className="glyphicon glyphicon-exclamation-sign"></span> How to practice</h3>
          <p>1. Press start button to record your face and voice</p>
          <p>2. Press stop button to stop recording</p>
          <p>3. Press submit button to see your analysis result</p>
        </div>:
        <div>
          <div className="row">
            <h3 className="resultSection">Sentiment Result</h3>
            <Chart emotion={this.props.msEmotion}/>
          </div>
          <hr className="featurette-divider" />
          <div className="row">
            <h3 className="resultSection">Speech Word Cloud</h3>
            <Cloud trans={this.props.transcription}/>
            <p>{"The clouds give greater prominence to words that appear more frequently in the source text"}</p>
          </div>
        </div>
      }
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    socket: state.socket,
    msEmotion: state.msEmotion,
    transcription: state.transcription,
    streamingStt: state.streamingStt
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    msEmotionReset: msEmotionReset,
    sttReset: sttReset,
    transcriptionReset: transcriptionReset,
    toneReset: toneReset,
    StreamingSttResponse: StreamingSttResponse,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Practice);
