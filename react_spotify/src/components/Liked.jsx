/** @format */

import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Card, Row, Container, Alert, Spinner } from "react-bootstrap";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  removeFromLiked: (id) =>
    dispatch({
      type: "RREMOVE_FROM_LIKED",
      payload: id,
    }),
});

class Liked extends Component {
  handleSubmit = () => {
    this.props.history.push("/yourLibrary/");
  };
  //
  render() {
    return (
      <Row>
        {this.props.like.map((like, i) => (
          <Col
            xs={12}
            sm={6}
            lg={4}
            xl={2}
            key={i}
            onClick={() =>
              this.props.history.push("/artist/" + this.props.artist.id)
            }
          >
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
              src={this.props.artist.cover_xl}
              alt="like selected"
            />
            <Card>
              <Card.Img
                variant="top"
                src={this.props.artist.picture_xl}
                alt="artistImage"
              />
              <Card.Body>
                <Card.Text className="text-center">
                  {this.props.artist.name}
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
