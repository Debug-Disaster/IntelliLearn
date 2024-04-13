import {Editor} from '@tinymce/tinymce-react';
import { useContext, useState } from 'react';
import { Input } from '@nextui-org/react'
import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import { UserContext } from '../context/UserContext';
import { Button } from '@nextui-org/react';
import Error from '../components/Error';
export const PostAssignment = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    //fix const [dueDate, setDueDate] = useState("")
    const [content, setContent] = useState("")
    const {user} = useContext(UserContext)
    if(!user || !user.role == 'mentor'){
        return <NotFound/>
    }
    const publishAssignment = async() => {
        if(!title || !description || !content){
            setError("Please fill in all fields")
            return
        }
        try{
            const res = await fetch(`http://localhost:8080/classroom/publish/${id}/assignment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    title,
                    description,
                    content
                })
            })
            const data = await res.json()
            if(!res.success){
                setError(data.error)
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='container mx-auto h-[100vh]'>
            <h1 className="font-extrabold text-4xl mt-6 mb-3">
                Post an assignment
            </h1>
            {error && <Error error={error}></Error>}
            <Input className='mb-5 mt-5' label="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <Input className='mb-5' label="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <Editor
                value={content}
                onEditorChange={(e) => setContent(e)}
                apiKey={process.env.REACT_APP_TINYMCE}
                initialValue=""
                init={{
                    height: 500,
                    menubar: false,
                    plugins: 'anchor autolink charmap codesample emoticons codesample image link lists media searchreplace table visualblocks wordcount linkchecker',
                    toolbar: 'undo redo | blocks fontfamily fontsize codesample | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    skin: 'oxide-dark',
                    content_css: 'tinymce-5-dark',
                }}
            />
            <Button variant="flat" color='success' className='w-[100%] mt-5' onClick={publishAssignment}>Publish</Button>
        </div>
    )
}