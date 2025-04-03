import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define the Post type
interface Post {
  _id: string;
  name: string;
  description: string;
  content: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // State for the add post form
  const [newPost, setNewPost] = useState({ name: "", description: "", content: "" });
  const [formErrors, setFormErrors] = useState({ name: "", description: "", content: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("https://backend-vercel-ti8p.vercel.app/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setPosts(data.data);
        } else {
          setError("No posts found");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to fetch posts");
      });
  }, []);

  const validateForm = () => {
    const errors = { name: "", description: "", content: "" };
    if (!newPost.name.trim()) errors.name = "Name is required";
    if (!newPost.description.trim()) errors.description = "Description is required";
    if (!newPost.content.trim()) errors.content = "Content is required";
    setFormErrors(errors);
    return !errors.name && !errors.description && !errors.content;
  };

  const handleAddPost = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch("https://backend-vercel-ti8p.vercel.app/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setPosts([...posts, data.data]);
        setNewPost({ name: "", description: "", content: "" });
        setShowForm(false);
      } else {
        alert(`Failed to add post: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("Error adding post. " + error);
    }
  };

  if (loading) return <div className="text-center text-gray-500 mt-10">Loading posts...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Posts</h2>
      <button onClick={() => setShowForm(!showForm)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        {showForm ? "Cancel" : "Add Post"}
      </button>
      
      {showForm && (
        <div className="mb-6 p-4 border rounded bg-gray-100">
          <input
            type="text"
            placeholder="Post Name"
            value={newPost.name}
            onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
            className="block w-full mb-2 p-2 border rounded"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          
          <input
            type="text"
            placeholder="Description"
            value={newPost.description}
            onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
            className="block w-full mb-2 p-2 border rounded"
          />
          {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
          
          <textarea
            placeholder="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            className="block w-full mb-2 p-2 border rounded"
          />
          {formErrors.content && <p className="text-red-500 text-sm">{formErrors.content}</p>}
          
          <button onClick={handleAddPost} className="px-4 py-2 bg-green-500 text-white rounded">
            Submit
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map((post: Post) => (
          <div key={post._id} className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-2">
              <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline">
                {post.name}
              </Link>
            </h3>
            <p className="text-gray-600">{post.description}</p>
            <p className="text-gray-700 mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;