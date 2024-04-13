import { Link, useParams } from "react-router-dom"
import { useGetClassroom } from "../hooks/useGetClassroom"
import NotFound from "../pages/NotFound"
import { Card, CardBody, Table, CardHeader, TableHeader, TableRow, TableCell, TableBody, TableColumn } from "@nextui-org/react"
export const Classroom = () => {
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
                    <p className="font-semibold text-3xl">The enrolled students:</p>
                    <Table>
                        <TableHeader>
                            <TableColumn>Username</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {classroom.studens && classroom.students.map(student => (
                                <TableRow key={student}>
                                    <TableCell>
                                        <Link to={`/profile/${student}`}>{student}</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
            <h1 className="font-extrabold text-4xl mt-6">
                Classwork
            </h1>
            {classroom.assignments && classroom.assignments.map((assignment, index) => (
                <Card key={assignment._id} className="mt-6">
                    <CardHeader>
                        <h2 className="font-bold text-3xl">{assignment.title}</h2>
                    </CardHeader>
                    <CardBody>
                        <p className="font-semibold text-lg">Description: {assignment.description}</p>
                        <p className="font-semibold text-lg">Due date: {assignment.dueDate}</p>
                        <p className="font-semibold text-lg">Problem page: <Link to={`/classroom/${id}/assignment/${index}`}>Go to assignment</Link></p>
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}