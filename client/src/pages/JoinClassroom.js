import { Modal, ModalHeader, useDisclosure, ModalContent, Button, Input } from '@nextui-org/react'
import { useGetClassrooms } from '../hooks/useGetClassrooms'
import { useState } from 'react'
import Error from '../components/Error'
const JoinClassroom = () => {
    const {data, error, loading} = useGetClassrooms()
    const [clickedCourse, setClickedCourse] = useState(null)
    const {isOpen, onClose, onOpenChange, onOpen} = useDisclosure()
    const [errora, setError] = useState('')
    const [password, setPassword] = useState('')
    const onJoinClassroom = async(id) => {
        try {
            const request = await fetch(`http://localhost:8080/classroom/join/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({password})
            })
            const response = await request.json()
            console.log(response)
            if(response.error) {
                setError(response.error)
            }
            if(response.message) {
                console.log(response.message)
            }
        }catch(err) {
            console.error(err)
        }
    }
    return (
        <div className='container mx-auto h-[100vh] mt-10'>
            {errora && <Error error={errora} />}
            <h1 className='text-4xl'>Join a classroom</h1>
            <div className='grid grid-cols-3 gap-4 mt-5'>
                {loading && <p>Loading...</p>}
                {data && data.map(classroom => {
                    return (
                        <div onClick={() => {setClickedCourse(classroom); onOpen()}} key={classroom._id} className='bg-white p-4 rounded-md shadow-md'>
                            <h1 className='font-extrabold text-3xl text-black'>{classroom.subject}</h1>
                            <p className='text-black'>{classroom.description}</p>
                        </div>
                    )
                })}
            </div>
            {clickedCourse && 
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        <ModalHeader onClose={onClose}>Join {clickedCourse.subject}</ModalHeader>
                        <p className='ml-4'>Interested on what you can do on this course?</p>
                        <p className='ml-4'>{clickedCourse.description}</p>
                        <p className='ml-4'>Mentor: {clickedCourse.mentor}</p>
                        <p className='ml-4'>Status: {clickedCourse.status}</p>
                        {clickedCourse.password && (
                            <Input onChange={(e) => setPassword(e.target.value)} className='p-4' placeholder='Password' />
                        )}
                        <Button onClick={() => {onJoinClassroom(clickedCourse._id); onClose()}} className='m-4' auto>
                            Join
                        </Button>
                    </ModalContent>
                </Modal>
            }
        </div>
    );
}
 
export default JoinClassroom;