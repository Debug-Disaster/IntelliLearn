import { Modal, ModalHeader, useDisclosure, ModalContent } from '@nextui-org/react'
import { useGetClassrooms } from '../hooks/useGetClassrooms'
import { useState } from 'react'
const JoinClassroom = () => {
    const {data, error, loading} = useGetClassrooms()
    const [clickedCourse, setClickedCourse] = useState(null)
    const {isOpen, onClose, onOpenChange, onOpen} = useDisclosure()
    return (
        <div className='container mx-auto h-[100vh] mt-10'>
            <h1 className='text-4xl'>Join a classroom</h1>
            <div className='grid grid-cols-3 gap-4 mt-5'>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
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
                    </ModalContent>
                </Modal>
            }
        </div>
    );
}
 
export default JoinClassroom;