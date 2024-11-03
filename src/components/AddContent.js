import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { addMediaItem } from "../features/mediaItemsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [newMediaItem, setNewMediaItem] = useState({
    title: "",
    description: "",
    genreId: "",
    imageUrl: "",
    status: "Draft",
    uploadDate: "",
  });
  const [genres, setGenres] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch genres from the API
  useEffect(() => {
    fetch("http://localhost:3001/genres")
      .then((response) => response.json())
      .then((data) => setGenres(data))
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMediaItem({ ...newMediaItem, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setNewMediaItem({ ...newMediaItem, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMediaItem(newMediaItem));
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          value={newMediaItem.title}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          id="description"
          name="description"
          type="textarea"
          rows="5"
          value={newMediaItem.description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="genreSelect">Genre</Label>
        <Input
          id="genreSelect"
          name="genreId"
          type="select"
          value={newMediaItem.genreId}
          onChange={handleChange}
          required
        >
          <option value="">Select a genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.genreName}
            </option>
          ))}
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
        <Label for="status">Status</Label>
        <Input
          id="status"
          name="status"
          type="select"
          value={newMediaItem.status}
          onChange={handleChange}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="uploadDate">Upload Date</Label>
        <Input
          id="uploadDate"
          name="uploadDate"
          type="date"
          value={newMediaItem.uploadDate}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit" color="primary">
        Add
      </Button>
    </Form>
  );
};

export default AddContent;