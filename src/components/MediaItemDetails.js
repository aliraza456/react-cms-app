import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Badge,
} from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchGenres } from "../features/genresSlice";

const MediaItemDetails = () => {
  const [mediaItem, setMediaItem] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  const { genres, isLoading: genresLoading } = useSelector(
    (state) => state.genres
  );

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres());
    }
  }, [dispatch, genres.length]);

  useEffect(() => {
    getSingleMediaItem(id);
  }, [id]);

  const getSingleMediaItem = (id) => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/mediaItems/${id}`)
      .then((res) => {
        setMediaItem(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching media item:", error);
        setLoading(false);
      });
  };

  const genre = genres.find(
    (gen) => gen.id === mediaItem.genreId?.toString()
  );

  if (loading || genresLoading) {
    return (
      <div className="d-flex justify-content-center my-auto">
        <Loader type="Oval" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  return (
    <Card style={{ height: "400px" }}>
      <Row>
        <Col md="3">
          <CardImg
            alt="Card image cap"
            src={mediaItem.imageUrl}
            top
            width="100%"
          />
        </Col>
        <Col md="9">
          <CardBody>
            <CardTitle tag="h5">{mediaItem.title}</CardTitle>
            <CardText>
              <strong>Genre: </strong>
              {genre ? genre.genreName : "Unknown"}
            </CardText>
            <CardText>{mediaItem.description}</CardText>
            <h4>
              <Badge color="dark">{mediaItem.status}</Badge>
            </h4>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default MediaItemDetails;