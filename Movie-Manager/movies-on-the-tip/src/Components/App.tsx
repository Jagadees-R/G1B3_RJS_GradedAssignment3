import NavigationMenu from "./NavigationMenu";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import MoviesList from "./Movies-List/List";
import Home from "./Home";
import MovieDetails from "./Movie-Details/Details";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <NavigationMenu />
      <Routes>
        <Route path="/:category/:id" element={<MovieDetails />} />
        <Route path="/movies-in-theaters" element={<MoviesList />} />
        <Route path="/movies-coming" element={<MoviesList />} />
        <Route path="/top-rated-india" element={<MoviesList />} />
        <Route path="/top-rated-movies" element={<MoviesList />} />
        <Route path="/favourite" element={<MoviesList />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
      />
    </>
  );
};

export default App;