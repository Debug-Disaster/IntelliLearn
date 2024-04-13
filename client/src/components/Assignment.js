import { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { useGetClassroom } from "../hooks/useGetClassroom"
import NotFound from "../pages/NotFound"
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { UserContext } from "../context/UserContext"
import { Editor } from "@monaco-editor/react"
import { useState } from "react"
export const Assignment = () => {
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
    const assignment = classroom.assignments[index]
    if(!assignment){
        return <NotFound/>
    }
    const submitAssignment = async() => {
        try{
            const res = await fetch(`http://localhost:8080/classroom/submit/${id}/assignment/${index}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    content: code
                })
            })
            const data = await res.json()
            if(res.success === false){
                console.log(data.error)
            }else{
                console.log(data)
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="container mx-auto h-[100%] my-5 p-5">
            <h1 className="font-extrabold text-4xl">
                This is the #{Number(index + 1)} assignment page of {classroom.mentor}'s classroom!
            </h1>
            <Card className="mt-6">
                <CardHeader>
                    <h2 className="font-bold text-3xl">{assignment.title}</h2>
                </CardHeader>
                <CardBody>
                    <p className="font-semibold text-lg">Description: {assignment.description}</p>
                    <p className="font-semibold text-lg">Due date: {assignment.dueDate}</p>
                    <p className="font-semibold text-lg">Submitted by:</p>
                </CardBody>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                    Assignment's description: &nbsp;
                    <p dangerouslySetInnerHTML={{__html: assignment.description}} className="font-semibold text-lg"></p>
                </CardHeader>
            </Card>
            <Card className="mt-6">
                <CardHeader>
                    Assignment's due date: &nbsp;
                </CardHeader>
            </Card>
            <div className="flex flex-col mt-5">
                <div className="h-[100%] bg-zinc-800 p-5 mb-5 rounded-md" dangerouslySetInnerHTML={{__html: assignment.content}}></div>
                <Editor onChange={(val, e) => {setCode(val); localStorage.setItem('code', code)}} value={code} theme='vs-dark' language='cpp' height={'80vh'} />
            </div>
            <Button color="default" type = "submit" variant="flat" size='sm' className="mt-5">
                Submit assignment
            </Button>
        </div>
    )
}