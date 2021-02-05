/** @format */

import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  removeFromLiked: (id) =>
    dispatch({
      type: "RREMOVE_FROM_LIKED",
      payload: id,
    }),
  selectThisJob: (artist) =>
    dispatch({
      type: "SELECT_ONE_SONG",
      payload: artist,
    }),
});

class Fav extends Component {
  handleSubmit = (like) => {
    this.props.selectThisJob(like);
    this.props.history.push("/yourLibrary/");
  };
  //
  render() {
    return (
      <div className="row mt-4 mb-4 mx-4">
        <ul className="col-sm-12" style={{ listStyle: "none" }}>
          {this.props.like.map((like, i) => (
            <li key={i} className="my-4 mx-4">
              <Button
                variant="danger"
                onClick={() => this.props.removeFromLiked(like.id)}
              >
                Remove
              </Button>
              <img
                onClick={(e) => this.handleSubmit(like)}
                style={{ height: "150px", width: "150px" }}
                className="mt-3"
                src={this.props.song.artist.cover_xl}
                alt="like selected"
              />
              {this.props.song.title_short}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Fav));
