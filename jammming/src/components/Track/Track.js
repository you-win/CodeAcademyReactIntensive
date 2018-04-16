import React from "react";
import "./Track.css";

class Track extends React.Component{
  constructor(props){
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }

  addTrack(){
    this.props.onAdd(this.props.result)
  }

  removeTrack(){
    this.props.onRemove(this.props.result)
  }

  renderAction(){
    if(this.props.isRemoval){
      return(<a className="Track-action" onClick={this.removeTrack}>-</a>);
    }else{
      return(<a className="Track-action" onClick={this.addTrack}>+</a>);
    }
  }

  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.result.name}</h3>
          <p>{this.props.result.artist} | {this.props.result.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;