import React from 'react'
import storageService from '../appwrite/storage'
import { Link } from 'react-router-dom'
import buttonImage from '../assets/circle-right-solid.svg'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-700 text-white rounded-xl p-0.5 border-2 border-slate-700 shadow-lg'>
            <div id='imageContainer' className='w-full justify-center mb-4 overflow-hidden h-80 md:h-52 relative'>
                <img id='featureImage' src={storageService.getFilePreview(featuredImage)} alt={title} 
                className=' relative rounded-xl object-cover w-full h-full' 
                style={{transition: 'filter 0.3s ease'}}/>
                <img id='button' src={buttonImage} alt={title}
                className=' absolute top-1/2 left-1/2 rounded-xl object-cover opacity-0 w-14 h-14' 
                style={{transform: 'translate(-50%, -50%)', transition: 'opacity 0.3s ease',
                  filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(103deg) brightness(105%) contrast(105%)'
                }}/>
            </div>
            <h2 className='text-lg font-medium'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard