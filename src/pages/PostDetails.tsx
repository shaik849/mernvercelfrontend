import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  id: number; // Prisma uses numbers for IDs
  name: string;
  description: string;
  content: string;
}

const PostDetails = () => {
  const { id } = useParams<{ id?: string }>(); // Handle possible undefined
  const navigate = useNavigate();
  const postId = id ? Number(id) : null; // Convert id to number safely

  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!postId) {
      setError("Invalid Post ID");
      setLoading(false);
      return;
    }

    fetch(`https://pern-backend-blush.vercel.app/api/post/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setPost(data.data);
          setEditedPost(data.data);
        } else {
          setError("Post not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch post");
        setLoading(false);
      });
  }, [postId]);

  const handleDelete = () => {
    if (!postId || !window.confirm("Are you sure you want to delete this post?")) return;

    fetch(`https://pern-backend-blush.vercel.app/api/post/${postId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Post deleted successfully");
          navigate("/posts");
        } else {
          alert("Failed to delete post");
        }
      })
      .catch(() => alert("Error deleting post"));
  };

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedPost(post);
  };

  const handleSave = () => {
    if (!postId || !editedPost) return;

    if (
      editedPost.name === post?.name &&
      editedPost.description === post?.description &&
      editedPost.content === post?.content
    ) {
      setIsEditing(false);
      return;
    }

    fetch(`https://pern-backend-blush.vercel.app/api/post/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedPost),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPost(editedPost);
          setIsEditing(false);
          alert("Post updated successfully!");
        } else {
          alert("Failed to update post.");
        }
      })
      .catch(() => alert("Error updating post."));
  };

  if (loading) return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedPost?.name || ""}
            onChange={(e) => setEditedPost({ ...editedPost!, name: e.target.value })}
            className="w-full text-3xl font-bold mb-4 border p-2 rounded"
          />
          <textarea
            value={editedPost?.description || ""}
            onChange={(e) => setEditedPost({ ...editedPost!, description: e.target.value })}
            className="w-full text-gray-600 mb-2 border p-2 rounded"
          />
          <textarea
            value={editedPost?.content || ""}
            onChange={(e) => setEditedPost({ ...editedPost!, content: e.target.value })}
            className="w-full text-gray-800 border p-2 rounded"
          />
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4">{post?.name}</h2>
          <p className="text-gray-600 mb-2">{post?.description}</p>
          <p className="text-gray-800">{post?.content}</p>
        </>
      )}

      <div className="mt-6 flex gap-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostDetails;
