import { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { useGetClassroom } from "../hooks/useGetClassroom"
import NotFound from "../pages/NotFound"
import { Card, CardBody, CardHeader } from "@nextui-org/react"
import { UserContext } from "../context/UserContext"
export const Assignment = () => {
    const {id, index} = useParams()
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
    return (
        <div className="container mx-auto h-[100vh] my-5 p-5">
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
            <Card className="mt-6">
                <CardHeader>
                    Assignment's content: &nbsp;
                    <p dangerouslySetInnerHTML={{__html: assignment.content}} className="font-semibold text-lg"></p>
                </CardHeader>
            </Card>
        </div>
    )
}