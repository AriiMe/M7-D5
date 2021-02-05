/** @format */

import React from "react";
import { Col, Card, Alert, Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  getArtists: () => {
    dispatch(async (dispatch, getState) => {
      try {
        const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/genre/152/artists`, {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "b5adde9161msh8a1dcb5f94ec12fp19467bjsn5987880f6b6c",
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            }
        }); 
        console.log(response)
        let artists = await response.json();
        console.log(artists, "FUCING ARTISTSSSSSSSSSSSSSSSSSSS")
        if (response.ok) {
          dispatch({
            type: "GET_ARTISTS",
            payload: [artists],
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
});

class ArtistCard extends React.Component {
  state = {
    genre: 152,
    artists: [],
    loading: true,
  };

componentDidMount = () => {
  this.props.getArtists();
}
/*  
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.genre !== this.props.genre) {
      console.log("PREVIOUS GENRE IS DIFFERENT TO THIS ONE");
      this.setState({ genre: this.props.genre });
      this.setState({ loading: true });
      console.log("GENRE ON Update BEFORE FETCHING", this.state.genre);
      this.fetchArtists();
      console.log("GENRE ON Update AFTER FETCHING", this.state.genre);
    }
  };*/

  render() {
    console.log(this.props.artists, "ARTIST")
    return (
    <div>
         {this.props.artists.map((artist, index) => {
          <Col
            xs={12}
            sm={6}
            lg={4}
            xl={2}
            key={index}
            onClick={() => this.props.history.push("/artist/" + artist.id)}
          >
            <Card>
              <Card.Img
                variant="top"
                src={artist.picture_xl}
                alt="artistImage"
              />
              <Card.Body>
                <Card.Text className="text-center">{artist.name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
       } )
      }
      </div> 
      )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ArtistCard));
