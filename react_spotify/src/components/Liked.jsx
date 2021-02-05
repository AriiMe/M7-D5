/** @format */

import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Col,
  Card,
  Row,
  Img,
  Container,
  Alert,
  Spinner,
} from "react-bootstrap";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  removeFromLiked: (singleArtist) =>
    dispatch({
      type: "REMOVE_FROM_LIKED",
      payload: singleArtist,
    }),
});

class Liked extends Component {
  //
  render() {
    return (
      <Row>
        {this.props.like.map((like, i) => (
          <Col xs={12} sm={6} lg={4} xl={2} key={i}>
            <img
              style={{ height: "150px", width: "150px" }}
              className="mt-3"
              src={this.props.artists.cover_xl}
            />
            <Card>
              <Card.Img
                variant="top"
                src={this.props.artists.picture_xl}
                alt="artistImage"
              />
              <Card.Body>
                <Card.Text className="text-center">
                  {this.props.artists.name}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Liked));
