import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./AlbumPage.css";
import CommentArea from "./CommentArea";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = async (dispatch) => {
  try {
    let response = await fetch(
      `https://deezerdevs-deezer.p.rapidapi.com/album/${album.id}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "b5adde9161msh8a1dcb5f94ec12fp19467bjsn5987880f6b6c",
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
        },
      }
    );
    let album = await response.json();
    console.log(album)
    return dispatch({type: "GET_ALBUM", playload: album})
  } catch (error) {
    console.log(error);
    return dispatch({ type: "SET_ERROR_CODE", payload: 404 });
  }
};

class AlbumPage extends React.Component {
  state = {
    tracklist: [],
    album: {},
  };

  componentDidMount = () => {
    this.fetchTracklist();
    console.log("hi");
  };

  render() {
    if (this.album) {
      return (
        <>
          <Container fluid className="d-flex" id="albumPage">
            <Row>
              <Col xs={12} lg={4}>
                <Container className="d-flex flex-column mt-5">
                  <Row className="mx-auto">
                    <img
                      className="img-fluid"
                      src={this.album.cover_xl}
                      alt="album cover"
                    />
                  </Row>
                  <Row className="text-center d-flex justify-content-center">
                    <h1 className="generalHeading">{this.album.title}</h1>
                  </Row>
                  <Row className="text-center d-flex justify-content-center">
                    <span className="text-muted artist">
                      {this.album.title}
                    </span>
                  </Row>
                  <Row className="d-flex justify-content-center mt-3">
                    <button id="playbtn" className="btn-play">
                      PLAY
                    </button>
                  </Row>
                  <Row className="d-flex text-center justify-content-center mt-2 albumLength">
                    <span class="text-muted">
                      {this.album.release_date} •{" "}
                      {this.album.nb_tracks} SONGS
                    </span>
                  </Row>
                </Container>
              </Col>
              <Col xs={12} lg={8} id="songList">
                <Container className="d-flex flex-column mt-5 here">
                  <Row className="d-flex justify-content-between">
                    {this.tracklist.map((song) => (
                      <Row
                        className="copy"
                        onClick={() =>
                          this.props.selectedSong(
                            song,
                            song.album.cover_xl
                          )
                        }
                      >
                        <Col className="d-flex flex-column">
                          <h5>{song.title}</h5>
                          <h6>{song.artist.name}</h6>
                        </Col>
                        <div className="songLength">{song.duration}</div>
                      </Row>
                    ))}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
          <Container fluid id="albumPage">
            <CommentArea albumId={this.props.match.params.id} />
          </Container>
        </>
      );
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AlbumPage);
