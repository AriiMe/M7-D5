import React from "react";
import { Col, Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  getTracklist: (id) => {
    dispatch(async (dispatch, getState) => {
      try {
        const response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${id}/top?limit=50`, {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "b5adde9161msh8a1dcb5f94ec12fp19467bjsn5987880f6b6c",
              "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            }
        }); 
        console.log(response)
        let tracklist = await response.json();
      console.log(tracklist.data, "TRACKLIST FROM THE CURRENT ARTIST")
        if (response.ok) {
          dispatch({
            type: "GET_TRACKLIST",
            payload: tracklist.data,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  },
});
class SongCard extends React.Component {
  componentDidMount=()=>{
    this.props.getTracklist(this.props.id)
  }
  render() {
    return (
      
      <div>
{this.props.tracklist.map((track) => (
  <Col
        xs={12}
        sm={6}
        lg={4}
        xl={2}
        onClick={() =>
          this.props.history.push("/album/" + this.props.song.album.id)
        }
      >
        <Card>
          <Card.Img
            variant="top"
            src={track.album.cover_xl}
            alt="artistImage"
          />
          <Card.Body>
            <Card.Text className="text-center">
              {track.title_short}
            </Card.Text>
            <Card.Text className="text-center">
              {track.album.title}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
))
      }
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SongCard));
