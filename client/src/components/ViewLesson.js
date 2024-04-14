import { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { useGetClassroom } from "../hooks/useGetClassroom"
import NotFound from "../pages/NotFound"
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { UserContext } from "../context/UserContext"
import { Editor } from "@monaco-editor/react"
import { useState } from "react"
export const ViewLesson = () => {
    const {id, index} = useParams()
    const [code, setCode] = useState(localStorage.getItem('code') || "")
    const {data: classroom, error, isLoading} = useGetClassroom(id)
    const {user} = useContext(UserContext)
    if(!user)
        return <NotFound/>
    if(isLoading)
        return <div>Loading...</div>
    if(!classroom){
        return <NotFound/>
    }
    const lesson = classroom.lessons[index]
    if(!lesson){
        return <NotFound/>
    }
    return (
        <div className="container mx-auto h-[100%] my-5 p-5">
            <h1 className="font-extrabold text-4xl">
                This is the #{Number(index + 1)} lesson page of {classroom.mentor}'s classroom!
            </h1>
            <Card className="mt-6">
                <CardHeader>
                    <h2 className="font-bold text-3xl">{lesson.title}</h2>
                </CardHeader>
                <CardBody>
                    <p className="font-semibold text-lg">Description: {lesson.description}</p>
                    <p className="font-semibold text-lg">Due date: {lesson.dueDate}</p>
                    <p className="font-semibold text-lg">Submitted by:</p>
                </CardBody>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                    Lesson's description: &nbsp;
                    <p dangerouslySetInnerHTML={{__html: lesson.description}} className="font-semibold text-lg"></p>
                </CardHeader>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                    Lessons's due date: &nbsp;
                </CardHeader>
            </Card>
            <div className="flex flex-col mt-5">
                <div className="h-[100%] bg-zinc-800 p-5 mb-5 rounded-md" dangerouslySetInnerHTML={{__html: lesson.content}}></div>
            </div>
        </div>
    )
}