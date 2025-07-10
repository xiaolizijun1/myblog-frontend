import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <header className="bg-gray-100 p-4 mb-6 shadow">
            <div className="max-w-3xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-blue-700">My Blog</Link>

                <div className="space-x-4">
                    <Link to="/">首页</Link>
                    <Link to="/new">写文章</Link>
                    {token ? (
                        <button onClick={handleLogout} className="text-red-500">登出</button>
                    ) : (
                        <Link to="/login" className="text-blue-600">登录</Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
