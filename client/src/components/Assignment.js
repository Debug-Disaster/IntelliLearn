import { useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { useGetClassroom } from "../hooks/useGetClassroom"
import NotFound from "../pages/NotFound"
import { Button, Card, CardBody, CardHeader, Modal, ModalContent, Snippet, useDisclosure } from "@nextui-org/react"
import { UserContext } from "../context/UserContext"
import { Editor } from "@monaco-editor/react"
import { useState } from "react"
export const Assignment = () => {
    const {onOpen, isOpen, onClose, onOpenChange} = useDisclosure()
    const [loading, setLoading] = useState(false)
    const {id, index} = useParams()
    const [code, setCode] = useState(localStorage.getItem('code') || "")
    const [assignmentFeedback, setAssignmentFeedback] = useState('')
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
    console.log(assignmentFeedback)
    const submitAssignment = async() => {
        try{
            setLoading(true)
            const res = await fetch(`http://localhost:8080/run/run`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    code,
                    classroom_id: id,
                    assignment: index
                })
            })
            const data = await res.json()
            if(res.success === false){
                console.log(data.error)
            }else{
                setAssignmentFeedback(data)
                console.log(data)
            }
            setLoading(false)
        }catch(err){
            setLoading(false)
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
            <Button onClick={() => {submitAssignment();onOpen()}} color="default" type = "submit" variant="flat" size='sm' className="mt-5">
                Submit assignment
            </Button>
            <Modal size="4xl" className="w-[100%]" onClose={() => setAssignmentFeedback(false)} isOpen={isOpen} onOpenChange={onOpenChange}>
               <ModalContent>
               {loading ? <div>Loading...</div> : (
                <div className="p-5">
                    <h1 className="font-bold text-3xl">Assignment submitted!</h1>
                    <p className="font-semibold text-lg">You have successfully submitted the assignment!</p>
                    <p className="font-semibold text-lg">Results:</p>
                    {assignmentFeedback.error && <p className="font-semibold text-lg">
                        <Snippet color="danger">
                            <pre>
                                {assignmentFeedback.error}
                            </pre>
                        </Snippet>
                    </p>}
                    {assignmentFeedback.message == 'All test cases passed!' ?  <p className="font-semibold text-lg">
                        <Snippet color="success">
                            <pre>
                                Great job! You passed all the tests!
                            </pre>
                        </Snippet>
                    </p>: (
                        <p className="font-semibold text-lg">
                            <Snippet color="warning">
                                <pre>
                                    Some test cases failed!
                                </pre>
                            </Snippet>
                        </p>
                    )}  
                    <p className="font-semibold text-lg">You can go back to the classroom now!</p>
                    <Button variant="flat" color="warning">
                        <Link to={`/classrooms/view/${id}`} className="font-semibold text-lg">Go back to the classroom</Link>
                    </Button>
                </div>
               ) }
               </ModalContent>
            </Modal>
        </div>
    )
}