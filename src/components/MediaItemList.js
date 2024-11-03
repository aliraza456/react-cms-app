import React, { useEffect } from "react";
import { Row, Col } from "reactstrap";
import MediaItem from "./MediaItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchMediaItems } from "../features/mediaItemsSlice";

const MediaItemList = ({ searchQuery }) => {
  const mediaItems = useSelector((state) => state.mediaItems.mediaItems);
  const selectedGenre = useSelector((state) => state.genres.selectedGenre);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMediaItems());
  }, [dispatch]);

  return (
    <Row>
      {mediaItems
        .filter((item) =>
          selectedGenre.id
            ? item.genreId?.toString() === selectedGenre.id.toString()
            : true
        )
        .filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((item, index) => (
          <Col md="4" className="mb-3" key={index}>
            <MediaItem mediaItem={item} />
          </Col>
        ))}
    </Row>
  );
};

export default MediaItemList;