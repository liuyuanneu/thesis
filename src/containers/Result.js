import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from './Chart';
import Cloud from './Cloud';
import Tone_Cloud from './Tone_Cloud';
import Radar from './Radar';

class Result extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div classname="Result">
        <h3>Sentiment Result</h3>
        <Chart />
        <Cloud />
        <Radar />
        <Tone_Cloud />
        <ul>
          {this.props.msEmotion.map((emotion) => {
            return (
              <li>
                <span>
                  <img src="http://www.pic4ever.com/images/145fs78038.gif" border="0" />
                  Anger : {(emotion.scores.anger).toFixed(4)}
                </span>
                <span> Contempt : {(emotion.scores.contempt).toFixed(4)} </span>
                <span> Disgust : {(emotion.scores.disgust).toFixed(4)} </span>
                <span> Fear : {(emotion.scores.fear).toFixed(4)} </span>
                <span>
                  <img src="http://www.pic4ever.com/images/Banane21.gif" border="0" />
                  Happiness : {(emotion.scores.happiness).toFixed(4)}
                </span>
                <span> Neutral : {(emotion.scores.neutral).toFixed(4)} </span>
                <span> Sadness : {(emotion.scores.sadness).toFixed(4)} </span>
                <span> Surprise : {(emotion.scores.surprise).toFixed(4)} </span>
              </li>
            );
          })
        }
        </ul>
        <h3>Tone Result</h3>
        {this.props.tone}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    msEmotion: state.msEmotion,
    tone: state.tone
  };
}

export default connect(mapStateToProps)(Result);
