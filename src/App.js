import React, { useState } from "react";
import PostList from "./PostList";
import PostForm from "./PostForm";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setRefresh(!refresh);
    setSelectedPost(null);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Form */}
        <div className="col-md-5 mb-4">
          <div className="card">
            <div className="card-body">
              <PostForm selectedPost={selectedPost} onSave={handleSave} />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <PostList key={refresh} onEdit={setSelectedPost} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
