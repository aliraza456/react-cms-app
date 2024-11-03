import React, { useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenres, changeGenre } from "../features/genresSlice";

const GenreList = () => {
  const { genres, selectedGenre } = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  return (
    <ListGroup>
      <ListGroupItem
        active={!selectedGenre.id}
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(changeGenre({}))}
        action
        tag="a"
      >
        All Genres
      </ListGroupItem>
      {genres.map((genre, index) => (
        <ListGroupItem
          active={genre.id === selectedGenre.id}
          style={{ cursor: "pointer" }}
          action
          tag="a"
          key={index}
          onClick={() => dispatch(changeGenre(genre))}
        >
          {genre.genreName}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default GenreList;