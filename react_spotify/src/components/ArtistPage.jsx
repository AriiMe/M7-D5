/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Row, Jumbotron, ListGroup } from "react-bootstrap";
import "./ArtistPage.css";
import SongCard from "./SongCard";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  getArtist: (id) => {
    dispatch(async (dispatch, getState) => {
      try {
        const response = await fetch(
          `https://deezerdevs-deezer.p.rapidapi.com/artist/` + id,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "b5adde9161msh8a1dcb5f94ec12fp19467bjsn5987880f6b6c",
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            },
          }
        );
        console.log(response);
        let singleArtist = await response.json();
        console.log(singleArtist, "Clicked artist");
        if (response.ok) {
          dispatch({
            type: "SELECT_SINGLE_ARTIST",
            payload: singleArtist,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
  addToFav: (singleArtist) =>
    dispatch({
      type: "ADD_TO_LIKED",
      payload: singleArtist,
    }),
});
class ArtistPage extends React.Component {
  state = {
    artist: {},
    tracklist: [],
  };
  componentDidMount = () => {
    this.props.getArtist(this.props.match.params.id);
    this.fetchTracklist();
  };
  fetchTracklist = async () => {
    try {
      let response2 = await fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/artist/${this.props.match.params.id}/top?limit=50`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "b5adde9161msh8a1dcb5f94ec12fp19467bjsn5987880f6b6c",
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      );
      let parsedResponse2 = await response2.json();
      this.setState({ tracklist: parsedResponse2.data });
      console.log(this.state.tracklist);
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    //console.log(this.props.singleArtist, "SELECTED ARTIST")
    return (
      <>
        <section id="album-banner">
          <Jumbotron className="py-0 align-items-center text-center">
            <div className="buttonbox">
              <p className="text-center p-0 m-0 listeners">
                {this.props.singleArtist.name} FANS
              </p>
              <h1 id="groupName">{this.props.singleArtist.name}</h1>
              <button
                id="playbtn"
                className="btn-play d-none d-md-inline-block"
              >
                PLAY
              </button>
              <button
                id="followbtn"
                className="btn-follow d-none d-md-inline-block"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.addToFav(this.props.singleArtist);
                }}
              >
                FOLLOW
              </button>
              <FontAwesomeIcon icon={["fas", "ellipsis-h"]} />
            </div>
            <img
              className="img-fluid"
              style={{ width: "100%", height: "50vh", objectFit: "cover" }}
              src={this.props.singleArtist.picture_xl}
              alt="album cover"
            />
            <div className="wrapper-img"></div>
            <Row className="d-flex justify-content-center contentnav">
              <ListGroup horizontal>
                <ListGroup.Item>Overview</ListGroup.Item>
              </ListGroup>
            </Row>
          </Jumbotron>
        </section>
        <Container fluid className="containerfix">
          <Row>
            <Container fluid>
              <h1
                style={{
                  color: "white",
                  fontSize: "40px",
                  marginBottom: "50px",
                }}
              >
                Popular Releases
              </h1>
              <Row className="popular">
                {this.state.tracklist.map((song) => (
                  <SongCard song={song} />
                ))}
              </Row>
            </Container>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArtistPage);
