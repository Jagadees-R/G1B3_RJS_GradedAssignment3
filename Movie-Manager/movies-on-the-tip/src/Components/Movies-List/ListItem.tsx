import IMovie from '../../Model/IMovie';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faXmark } from '@fortawesome/free-solid-svg-icons';
import Rating from '../Common/Rating';

type Props = {
  movie: IMovie,
  category: string,
  addFavourite: (movie: IMovie) => void,
  removeFavourite: (id: string | number) => void
};

const MovieListItem = ({ category, movie, addFavourite, removeFavourite }: Props) => {
  const {
    id,
    title,
    poster,
    ratings
  } = movie;

  return (
    <Card style={{ width: '15rem' }}>
      <Link to={`/${category}/${id}`}>
        <Card.Img variant="top" src={` ${process.env.REACT_APP_API_BASE_URL}/images/${poster}`} />
      </Link>
      <Card.Body>
        <Card.Title>
          <div className="text-sm">
            {title}
            <div className="text-xs">
              <Rating values={ratings} />
            </div>
          </div>
        </Card.Title>

        <div className="text-center">
          {
            (category == "favourite") ? (
              <Button variant="light" size="sm" className="text-xs" onClick={() => removeFavourite(id)}>
                Remove from favourites
                <span className="ms-2">
                  <FontAwesomeIcon icon={faXmark} style={{ color: "red" }} />
                </span>
              </Button>) :
              (<Button variant="light" size="sm" className="text-xs" onClick={() => addFavourite(movie)}>
                Add to favourites
                <span className="ms-2">
                  <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
                </span>
              </Button>)
          }
        </div>
      </Card.Body>
    </Card>
  )
};

export default MovieListItem;