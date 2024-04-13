import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import {Button, Checkbox, CheckboxGroup, Input, Textarea} from '@nextui-org/react'
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
    const [choice, setChoice] = useState('')
    // do this later please, need to fix from the backend and frontend part of roles
    /*  if(!user || user.role !== 'mentor'){
        return <h1>Unauthorized</h1>
    } */
    const publishClassroom = async(e) => {
        e.preventDefault()
        try{
            const res = await fetch('http://localhost:8080/classroom/publish', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({mentor: user.username, subject, description, classroom_photo, status, password}),
                credentials: 'include'
            })
            const data = await res.json()
            if(data.success){
                window.location.href = '/classrooms'
                setMessage(data.message)
            }else{
                setError(data.error)
            }
        }catch(err){
            setError('Internal Server Error')
        }
    }
    return (
        <div className="container flex flex-col mx-auto mt-10 h-[100vh]">
            <h1 className="text-4xl font-bold mb-5">Create Classroom</h1>
            <form onSubmit={(e) => publishClassroom(e)} className="flex flex-col gap-5">
                <CheckboxGroup orientation="horizontal">
                    <Checkbox onChange={(e) => {
                        //modificat de regele alex + sa modifici sa nu poata sa fie ambele checked in acelasi timp ca nu mi iese
                        if(choice === 1){
                            setChoice(0);
                            return;
                        }
                        setChoice(1);
                    }} value={1}>Private (with password connection)</Checkbox>
                    <Checkbox onChange={(e) => setChoice(0)} value={0} >Public</Checkbox>
                </CheckboxGroup>
                <Textarea size="lg" variant="bordered" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <Textarea variant="bordered" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Input variant="bordered" placeholder="Classroom Photo" value={classroom_photo} onChange={(e) => setClassroomPhoto(e.target.value)} />
                <Input variant="bordered" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} />
                {choice === 1 && <Input variant="bordered" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />}
                <Button type="submit" variant="flat" className="mb-10">Publish Classroom</Button>
            </form>
        </div>
    );
}