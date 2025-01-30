import React, { useEffect, useState } from 'react'
import databaseService from '../appwrite/database'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if(!authStatus)
            setPosts([])

        databaseService.getPosts().then((posts)=>{
            if(posts) {
                setPosts(posts.documents)
            }
        })
    }, [authStatus])
  
    if (posts.length === 0) {
        return (
            <div className='h-full text-white text-3xl font-semibold tracking-wide content-center'>
                Login To See Post
            </div>
        )
    }
    
    return (
        <div className='w-full py-3'>
            <Container p='p-4' mxw='w-full'>
                <div className='flex flex-wrap flex-col md:flex-row'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-3 w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
      )  
}

export default Home