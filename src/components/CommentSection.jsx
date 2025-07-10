import { useEffect, useState } from 'react'
import api from '../api/axios'

function CommentSection({ postId }) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [replyTo, setReplyTo] = useState(null) // 被回复的评论 ID

    const fetchComments = () => {
        api.get(`/comments/?post=${postId}`)
            .then(res => setComments(res.data))
            .catch(err => console.error('加载评论失败', err))
    }

    useEffect(() => {
        fetchComments()
    }, [postId])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        const payload = {
            content: newComment,
            post: postId,
            parent: replyTo || null
        }

        api.post('/comments/', payload)
            .then(() => {
                setNewComment('')
                setReplyTo(null)
                fetchComments()
            })
            .catch(err => console.error('发表评论失败', err))
    }

    const renderReplies = (replies) => {
        return replies.map(reply => (
            <div key={reply.id} className="ml-4 mt-2 border-l pl-2 text-sm">
                <p><strong>{reply.author}</strong>: {reply.content}</p>
            </div>
        ))
    }

    return (
        <div className="mt-6">
            <form onSubmit={handleSubmit} className="mb-4">
                {replyTo && (
                    <p className="text-sm text-gray-500 mb-1">
                        回复评论 #{replyTo} <button className="ml-2 text-blue-500" onClick={() => setReplyTo(null)}>取消</button>
                    </p>
                )}
                <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                    rows={3}
                    placeholder="写下你的评论..."
                />
                <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">发表评论</button>
            </form>

            {comments.length === 0 ? (
                <p className="text-gray-500">还没有评论，快来抢沙发吧！</p>
            ) : (
                comments.map(comment => (
                    <div key={comment.id} className="border-b pb-2 mb-2">
                        <p><strong>{comment.author}</strong>: {comment.content}</p>
                        <button
                            className="text-sm text-blue-500 mt-1"
                            onClick={() => setReplyTo(comment.id)}
                        >
                            回复
                        </button>
                        {renderReplies(comment.replies)}
                    </div>
                ))
            )}
        </div>
    )
}

export default CommentSection

