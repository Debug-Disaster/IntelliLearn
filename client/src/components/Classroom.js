import { Link, useParams } from "react-router-dom"
import { useGetClassroom } from "../hooks/useGetClassroom"
import NotFound from "../pages/NotFound"
import {UserContext} from '../context/UserContext'
import {useContext} from 'react'
import { Card, CardBody, Table, CardHeader, TableHeader, TableRow, TableCell, TableBody, TableColumn, Button } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"
export const Classroom = () => {
    const navigate = useNavigate()
    const {user} = useContext(UserContext)
    const {id} = useParams()
    const {data: classroom, error, isLoading} = useGetClassroom(id)
    if(isLoading)
        return <div>Loading...</div>
    if(!classroom){
        return <NotFound/>
    }
    return (
        <div className="container mx-auto h-[100vh] my-5">
            <h1 className="font-extrabold text-4xl">
                Welcome to {classroom.mentor}'s classroom!
            </h1>
            <Card className="mt-6">
                <CardHeader>
                    <h2 className="font-bold text-3xl">Classroom Details</h2>
                </CardHeader>
                <CardBody>
                    <p className="font-semibold text-lg">Classroom subject: {classroom.subject}</p>
                    <p className="font-semibold text-lg">Classroom description: <br></br> {classroom.description}</p>
                    <p className="font-semibold text-3xl mt-5">The enrolled students:</p>
                    <Table>
                        <TableHeader>
                            <TableColumn>Username</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {classroom.students && classroom.students.map((student) => (
                                <TableRow key={student}>
                                    <TableCell>
                                        {student !== classroom.mentor ? (
                                            <Link to={`/profile/${student}`}>{student}</Link>
                                        ) : (
                                            <span></span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
            <div style={{display:'flex', flexDirection:'row', gap:'20px', alignItems:'center'}} className="mt-6">
                <h1 className="font-extrabold text-4xl" >Classwork</h1>
                {user.username === classroom.mentor &&
                <Button onClick={() => navigate(`/classrooms/${id}/new/assignment`)} color="default" type = "submit" variant="bordered" size='sm' style={{marginTop:'5px'}}>
                    Post assignment
                </Button>
                }
            </div>
            {classroom.assignments && classroom.assignments.map((assignment, index) => (
                <Card key={assignment._id} className="mt-6">
                    <CardHeader>
                        <h2 className="font-bold text-3xl">{assignment.title}</h2>
                    </CardHeader>
                    <CardBody>
                        <p className="font-semibold text-lg">Description: {assignment.description}</p>
                        <p className="font-semibold text-lg">Due date: {assignment.dueDate}</p>
                        <p className="font-semibold text-lg">Problem page: <Link to={`/classrooms/${id}/assignment/${index}`}>Go to assignment</Link></p>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}