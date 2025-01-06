import React, { useCallback, useEffect } from 'react'
import { Button, Input, RTE, Select } from '../index'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import storageService from '../../appwrite/storage'
import databaseService from '../../appwrite/database'

export default function PostForm({post}) {
    const {register, handleSubmit, getValues, setValue, control, watch} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async(data) => {
        if(post){
            const imageFile = data.image[0] ? await storageService.uploadFile(data.image[0]): null;
            if(imageFile){
                storageService.deleteFile(post.featuredImage)
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: imageFile ? imageFile.$id : undefined
            })

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`)
                //TO Test: Change here post.$id
            }
        } else {
            const imageFile = data.image[0] ? await storageService.uploadFile(data.image[0]): null;
            if(imageFile) {
                //Here a little change
                const dbPost = await databaseService.createPost({
                    ...data,
                    featuredImage: imageFile.$id,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }   
            }
        }
    };

    const slugTransform = useCallback((value)  => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, [])

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            if( name === "title")
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
        })

        return () => subscription.unsubscribe();

    }, [watch, slugTransform, setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input 
                label="Title: "
                placeholder="Title"
                className="mb-4"
                {...register("title", {required: true})}
            />
            <Input 
                label="Slug: "
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e)=>{
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE 
                label="Content: "
                name="content"
                defaultValue={getValues("content")}
                control={control}
            />
        </div>
        <div className="w-1/3 px-2">
            <Input 
                label="Featured Image: "
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={storageService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select 
                options={["active", "inactive"]}
                label="Status: "
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type='submit' bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post? "Update" : "Submit"}
            </Button>
        </div>
    </form>
  )
}
