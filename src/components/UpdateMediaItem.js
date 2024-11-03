import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { updateMediaItem } from "../features/mediaItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenres } from "../features/genresSlice";

const UpdateMediaItem = ({ mediaItem, toggle }) => {
  const dispatch = useDispatch();
  const { genres, isLoading: genresLoading, error } = useSelector(
    (state) => state.genres
  );

  const [updatedMediaItem, setUpdatedMediaItem] = useState({
    id: mediaItem.id,
    title: mediaItem.title,
    status: mediaItem.status,
    imageUrl: mediaItem.imageUrl,
    description: mediaItem.description,
    genreId: mediaItem.genreId ? mediaItem.genreId.toString() : "",
  });
  const [imagePreview, setImagePreview] = useState(mediaItem.imageUrl);

  useEffect(() => {
    if (genres.length === 0) {
      dispatch(fetchGenres());
    }
  }, [dispatch, genres.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMediaItem({ ...updatedMediaItem, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setUpdatedMediaItem({ ...updatedMediaItem, imageUrl: reader.result });
      };
      reader.readAsDataURL(file); // Convert the image to a base64 URL for preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateMediaItem(updatedMediaItem));
    toggle();
  };

  if (genresLoading) {
    return <div>Loading genres...</div>;
  }

  if (error) {
    return <div>Error loading genres: {error}</div>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={updatedMediaItem.title}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input
          id="status"
          name="status"
          type="select"
          value={updatedMediaItem.status}
          onChange={handleChange}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="image">Upload Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="mt-3">
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          id="description"
          name="description"
          type="textarea"
          rows="5"
          value={updatedMediaItem.description}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="genreSelect">Genre</Label>
        <Input
          id="genreSelect"
          name="genreId"
          type="select"
          value={updatedMediaItem.genreId}
          onChange={handleChange}
        >
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genreName}
            </option>
          ))}
        </Input>
      </FormGroup>
      <Button type="submit" color="success">
        Edit
      </Button>
    </Form>
  );
};

export default UpdateMediaItem;