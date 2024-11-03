import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "reactstrap";
import { fetchMediaItems } from "../features/mediaItemsSlice";
import { Link } from "react-router-dom";
import AdminMediaItem from "./AdminMediaItem";

const Admin = ({ searchQuery }) => {
  const mediaItems = useSelector((state) => state.mediaItems.mediaItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMediaItems());
  }, [dispatch]);

  return (
    <>
      <Button tag={Link} to="/addcontent" color="primary" className="mb-3">
        Add Content
      </Button>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th width="500">Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mediaItems
            .filter((item) =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item, i) => (
              <AdminMediaItem mediaItem={item} key={i} />
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default Admin;