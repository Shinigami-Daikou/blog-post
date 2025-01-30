import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className='py-8 text-white shadow-md'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost