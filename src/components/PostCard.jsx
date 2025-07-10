import { Link } from 'react-router-dom'

function PostCard({ post }) {
    return (
        <div className="border p-4 rounded-xl shadow mb-4 hover:shadow-md transition">
            {post.cover_image && (
                <img
                    src={`http://127.0.0.1:8000${post.cover_image}`}
                    alt="cover"
                    className="w-full h-48 object-cover rounded-md mb-3"
                />
            )}
            <Link to={`/posts/${post.id}`}>
                <h2 className="text-xl font-bold text-blue-600 hover:underline">{post.title}</h2>
            </Link>
            <p className="text-sm text-gray-500">
                by {post.author} | {new Date(post.created_at).toLocaleDateString()}
            </p>
        </div>
    )
}

export default PostCard
