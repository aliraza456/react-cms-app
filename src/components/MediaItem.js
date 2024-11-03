import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Badge,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MediaItem = ({ mediaItem }) => {
  const genres = useSelector((state) => state.genres.genres);

  const genre = genres.find(
    (gen) => gen.id === mediaItem.genreId?.toString()
  );

  return (
    <Card>
      <CardImg alt="Card image cap" src={mediaItem.imageUrl} top width="100%" />
      <CardBody>
        <CardTitle tag="h5">
          {mediaItem.title}{" "}
          <h4 className="d-inline">
            <Badge color="dark">{mediaItem.status}</Badge>
          </h4>
        </CardTitle>
        <CardText>
          <strong>Genre: </strong>
          {genre ? genre.genreName : "Unknown"}
        </CardText>
        <CardText>{mediaItem.description.substring(0, 140)}...</CardText>
        <Button tag={Link} to={`/details/${mediaItem.id}`} color="primary">
          Review
        </Button>
      </CardBody>
    </Card>
  );
};

export default MediaItem;