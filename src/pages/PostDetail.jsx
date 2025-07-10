import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../api/axios'
import CommentSection from '../components/CommentSection'


function PostDetail() {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get(`/posts/${id}/`)
            .then(res => {
                setPost(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error('加载文章失败', err)
                setLoading(false)
            })
    }, [id])

    const handleLike = () => {
        api.post(`/posts/${id}/like/`)
            .then(() => setPost(prev => ({ ...prev, is_liked: true, likes_count: prev.likes_count + 1 })))
            .catch(err => console.error(err))
    }

    const handleUnlike = () => {
        api.post(`/posts/${id}/unlike/`)
            .then(() => setPost(prev => ({ ...prev, is_liked: false, likes_count: prev.likes_count - 1 })))
            .catch(err => console.error(err))
    }

    const handleFavorite = () => {
        api.post(`/posts/${id}/favorite/`)
            .then(() => setPost(prev => ({ ...prev, is_favorited: true })))
            .catch(err => console.error(err))
    }

    const handleUnfavorite = () => {
        api.post(`/posts/${id}/unfavorite/`)
            .then(() => setPost(prev => ({ ...prev, is_favorited: false })))
            .catch(err => console.error(err))
    }

    if (loading) return <p>加载中...</p>
    if (!post) return <p>文章不存在</p>

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-2">by {post.author} | {new Date(post.created_at).toLocaleDateString()}</p>

            {post.cover_image && (
                <img
                    src={`http://127.0.0.1:8000${post.cover_image}`}
                    alt="封面"
                    className="w-full max-h-[400px] object-cover rounded mb-4"
                />
            )}

            <div className="prose max-w-none mb-4">
                {post.content}
            </div>

            <div className="flex items-center space-x-4 mb-4">
                <span>👍 {post.likes_count}</span>
                {post.is_liked ? (
                    <button className="text-red-500" onClick={handleUnlike}>取消点赞</button>
                ) : (
                    <button onClick={handleLike}>点赞</button>
                )}

                {post.is_favorited ? (
                    <button className="text-yellow-500" onClick={handleUnfavorite}>取消收藏</button>
                ) : (
                    <button onClick={handleFavorite}>收藏</button>
                )}
            </div>

            <hr className="my-6" />

            <div>
                <h2 className="text-lg font-semibold mb-2">💬 评论区</h2>
                {/* 评论功能将在下一步实现 */}
                <p><CommentSection postId={id} /></p>
            </div>
        </div>
    )
}

export default PostDetail
