import { useState, useEffect } from 'react';
import { Alert, Col, Nav, Row } from 'react-bootstrap';
import { useParams } from 'react-router';
import IMovie from '../../Model/IMovie';
import { getMoviesById } from '../../Services/Movie';
import { LoadingStatus } from '../../Utils/types';
import LoadingIndicator from '../Common/LoadingIndicator';
import Rating from '../Common/Rating';

export type MyParams = {
  category: string,
  id: string | number
}

const MovieDetails = () => {

  let { category, id } = useParams<keyof MyParams>() as MyParams;

  const [status, setStatus] = useState<LoadingStatus>('LOADING');
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const loadMovie = async () => {
    try {
      const data = await getMoviesById(category, id);
      setMovie(data);
      setStatus('LOADED')
    } catch (err: any) {
      setError(err.response && err.response.data && err.response.data.message || err.message);
      setStatus('ERROR_LOADING')
    }
  };

  useEffect(() => {
    setStatus('LOADING')
    loadMovie();
  }, []);

  let el;

  switch (status) {

    case 'LOADING':
      el = (
        <div className="my-4 mx-4">
          <LoadingIndicator
            size="large"
            message="We are fetching the Movie details. Please wait..."
          />
        </div>
      );
      break;

    case 'LOADED':
      const {
        title,
        poster,
        year,
        imdbRating,
        contentRating,
        duration,
        releaseDate,
        ratings,
        storyline,
        actors,
        genres
      } = movie as IMovie;

      el = (
        <div className="my-4 mx-4">
          <Row>
            <Col xs={12} lg={3}>
              <img
                src={`${process.env.REACT_APP_API_BASE_URL}/img/${poster}`}
                alt={title}
                className="ms-2"
                style={{ width: "300px" }}
              />
            </Col>
            <Col xs={12} lg={9}>
              <div className="fs-2 my-2">
                {title}({year})
              </div>
              <Row className="my-2">
                <Col lg={3}>IMDB Rating</Col>
                <Col lg={9}>{imdbRating}</Col>
              </Row>
              <Row className="my-2">
                <Col lg={3}>Content Rating</Col>
                <Col lg={9}>{contentRating}</Col>
              </Row>
              <Row className="my-2">
                <Col lg={3}>Average Rating</Col>
                <Col lg={9}><Rating values={ratings} /></Col>
              </Row>
              <Row className="my-2">
                <Col lg={3}>Duration</Col>
                <Col lg={9}>{duration}</Col>
              </Row>
              <Row className="my-2">
                <Col lg={3}>Genres</Col>
                <Col lg={9}>{genres.join(", ")}</Col>
              </Row>
              <Row className="my-2">
                <Col lg={3}>Actors</Col>
                <Col lg={9}>{actors.join(", ")}</Col>
              </Row>
              <Row className="my-2">
                <Col lg={3}>Release Date</Col>
                <Col lg={9}>{releaseDate}</Col>
              </Row>
              <Row className="my-2">
                <Col lg={3}>Story Line</Col>
                <Col lg={9}>{storyline}</Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
      break;

    case 'ERROR_LOADING':
      el = (
        <div className="my-4 mx-4">
          <Alert variant="danger" className="my-3">
            {error?.message}
          </Alert>
        </div>
      );
      break;
  }

  return el;

}

export default MovieDetails;