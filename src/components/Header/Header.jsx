import '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'

export default function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: '/',
            active: true
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
    <header className='py-1 shadow bg-gray-800 text-white'>
        <Container mxw='max-w-full' p='px-8 py-2'>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to='/'>
                        <div className='flex items-center px-5'>
                            <div>
                                <Logo width='50px'/>
                            </div>
                            <div className='text-3xl px-2 text-balance font-normal'>
                                BlogPost
                            </div>
                        </div>
                        
                    </Link> 
                </div>

                <ul className='flex ml-auto'>
                    {navItems.map((item) => 
                        item.active ? 
                            <li key={item.name}>
                                <button onClick={() => navigate(item.slug)}
                                    className='inline-block text-lg px-6 py-2 duration-200 hover:bg-gray-700 hover:text-gray-300 rounded-md'
                                >{item.name}</button>
                            </li> : null
                    )}
                    {!authStatus && (
                        <li key='Login'>
                            <button onClick={() => navigate('/login')}
                                className='inline-block text-lg px-6 py-2 duration-200 hover:bg-blue-500 rounded-md'
                            >Login &#8594;</button>
                        </li>
                    )}
                    {authStatus && (
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>

            </nav>
        </Container>
    </header>
    )
}