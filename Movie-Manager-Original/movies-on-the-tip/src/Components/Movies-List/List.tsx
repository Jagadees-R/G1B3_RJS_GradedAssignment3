import { useState, useEffect } from 'react';
import { Row, Col, Alert, Form, FormControl } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import IMovie from '../../Model/IMovie';
import { LoadingStatus } from '../../Utils/types';
import { addMovieToFavourite, checkMovie, getMovies, removeMovieFromFavourite } from '../../Services/Movie';
import LoadingIndicator from '../Common/LoadingIndicator';
import MovieListItem from './ListItem';

const MoviesList = () => {
  let location = useLocation();
  let category = location.pathname.replace('/', '');

  const [status, setStatus] = useState<LoadingStatus>('LOADING');
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isRemoved, setIsRemoved] = useState<boolean>(false);

  const addFavourite = async (movie: IMovie) => {

    let data = await checkMovie(movie.title);
    console.log(JSON.stringify(data));
    if (JSON.stringify(data) === '[]') {
      try {
        await addMovieToFavourite(movie);
        toast.success('Movie added to favourites Successfully', {});
      } catch (err: any) {
        console.log(err.message)
      }
    } else {
      toast.error('Movie already in favourites', {});
    }
  };

  const removeFavourite = async (id: string | number) => {
    try {
      await removeMovieFromFavourite(id);
      setIsRemoved(true);
      toast.warn('Movie removed from favourites Successfully', {});
    } catch (err: any) {
      console.log(err)
    }
  };

  let inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    setSearchValue(input);
  };

  const fetchMovies = async () => {
    try {
      const data = await getMovies(category);
      setMovies(data)
      setStatus('LOADED')
    } catch (err: any) {
      setError(err.response && err.response.data && err.response.data.message || err.message);
      setStatus('ERROR_LOADING')
    }
  };

  useEffect(() => {
    setStatus('LOADING')
    fetchMovies();
  }, []);

  useEffect(() => {
    if (category !== '') {
      setStatus('LOADING')
      fetchMovies();
      setIsRemoved(false);
    }
  }, [location, isRemoved]);

  let el;

  switch (status) {
    case 'LOADING':
      el = (
        <div>
          <LoadingIndicator
            size="large"
            message="We are fetching the list of Movies. Please wait..."
          />
        </div>
      );
      break;
    case 'LOADED':
      el = (
        <div>
          <Row className="mx-5 my-4">
            <Col lg={9} md={6}></Col>
            <Col lg={3} md={6}>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search Movie"
                  className="me-2"
                  aria-label="Search"
                  onChange={inputHandler}
                  value={searchValue}
                />
              </Form>
            </Col>
          </Row>
          <Row xs={2} md={3} lg={6} className="mx-4">
            {movies.filter((item) => {
              if (searchValue === "") {
                return item;
              } else if (item.title.toLowerCase().includes(searchValue.toLowerCase())) {
                return item;
              }
            })
              .map(
                movie => (
                  <Col key={movie.id} className="d-flex align-items-stretch my-2">
                    <MovieListItem
                      movie={movie}
                      category={category}
                      addFavourite={addFavourite}
                      removeFavourite={removeFavourite}
                    />
                  </Col>
                )
              )
            }
          </Row>
        </div>
      );
      break;
    case 'ERROR_LOADING':
      el = (
        <div>
          <Alert variant="danger my-3">
            {error?.message}
          </Alert>
        </div>
      );
      break;
  }

  return el;

};

export default MoviesList;