import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import {Input} from '@nextui-org/react'
import { useState } from "react";
export const CreateClassroom = () => {
    const {user} = useContext(UserContext)
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [classroom_photo, setClassroomPhoto] = useState('')
    const [status, setStatus] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [password, setPassword] = useState('')
    // do this later please, need to fix from the backend and frontend part of roles
    /*  if(!user || user.role !== 'mentor'){
        return <h1>Unauthorized</h1>
    } */
    return (
        <div className="container flex flex-col mx-auto mt-10">
            <h1 className="text-4xl font-bold mb-5">Create Classroom</h1>
            <form className="flex flex-col gap-5">
                <Input multiple variant="bordered" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <Input variant="bordered" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Input variant="bordered" placeholder="Classroom Photo" value={classroom_photo} onChange={(e) => setClassroomPhoto(e.target.value)} />
                <Input variant="bordered" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
                <button type="submit" className="btn">Publish</button>
            </form>
        </div>
    );
}