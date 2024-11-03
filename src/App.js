import React, { useState } from "react";
import Header from "./components/Header";
import { Row, Col, Container } from "reactstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GenreList from "./components/GenreList";
import MediaItemList from "./components/MediaItemList";
import MediaItemDetails from "./components/MediaItemDetails";
import Admin from "./components/Admin";
import AddContent from "./components/AddContent";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Header setSearchQuery={setSearchQuery} />
      <Container className="mt-3">
        <Routes>
          <Route
            path="/"
            element={
              <Row>
                <Col md="3">
                  <GenreList />
                </Col>
                <Col md="9">
                  <MediaItemList searchQuery={searchQuery} />
                </Col>
              </Row>
            }
          />
          <Route path="/details/:id" element={<MediaItemDetails />} />
          <Route path="/admin" element={<Admin searchQuery={searchQuery} />} />
          <Route path="/addcontent" element={<AddContent />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;