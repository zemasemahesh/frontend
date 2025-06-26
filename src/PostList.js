import React, { useEffect, useState } from "react";
import api from "./api";

function PostList({ onEdit }) {
  const [posts, setPosts] = useState([]);

  const loadPosts = async () => {
    try {
      const res = await api.get("/api.php");
      setPosts(res.data);
    } catch (error) {
      console.error("Error loading posts:", error);
      alert("Failed to load posts");
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/api.php?id=${id}`);
      loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="mt-4">
      <h2>User List</h2>

      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>{post.name}</td>
                <td>{post.email}</td>
                <td>{post.dob}</td>
                <td>
                  <button
                    onClick={() => onEdit(post)}
                    className="btn btn-sm btn-warning me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PostList;
