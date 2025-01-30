import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import databaseService from '../appwrite/database'
import { useSelector } from 'react-redux'

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        databaseService.getPosts([]).then((posts)=>{
            if(posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

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

export default AllPosts