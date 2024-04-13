import {useParams, Link} from 'react-router-dom';
import {Avatar, Button, Chip} from "@nextui-org/react";
import uploadImage from '../assets/uploadImage.png'
import {useEffect, useState} from 'react'
import {useGetUser} from '../hooks/useGetUser'
const Profil = () => {
    const [isHovered, setIsHovered] = useState(false);
    const {username} = useParams();
    useEffect(() =>{
        const verifyUser = async () =>{
            try{
                const response = await fetch('http://localhost:8080/user/getUser', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username})
                });
                const data = await response.json();
                console.log(data)
            }catch(error){
                console.log(error)
            }
        }

    }, []);
    const {data, loading, error} = useGetUser(username);
    console.log(data)
    return (
        <div className='flex flex-row max-md:flex-col gap-5 m-5 h-[100%]'>
            <div className='flex flex-col w-[40%] max-md:w-[100%] bg-white h-[100vh]'>
                    <div className='mx-auto'>
                        <Avatar src={
                            isHovered ? uploadImage : `https://i.pravatar.cc/150?u=a042581f4e29026024d`}
                            onMouseEnter={() => {
                                //if(user && user.username === userProfile.username){
                                setIsHovered(true); 
                                //}
                            }}
                            onMouseLeave={() => {
                                //if(user && user.username === userProfile.username){
                                    setIsHovered(false); 
                                //}
                            }
                        }   style={{cursor:'pointer'}}
                            className="w-40 h-40 text-large mt-5" />
                        <p className='mx-auto'> Gigel </p>
                    </div>
                    <div className='flex flex-row gap-2 mx-auto'>
                        <Chip color='primary'>Cybersecurity</Chip>
                        <Chip color='primary'>Mentor</Chip>
                        <Chip color='primary'>Founder</Chip>
                    </div> 
                    <div className='flex flex-col gap-2 mx-auto text-black p-5'>
                        <p>About me</p>
                        <p>I am a cybersecurity expert with over 10 years of experience in the field. I have a passion for teaching and I am the founder of Cybersecurity Academy.</p>
                    </div> 
            </div>
            <div className='flex flex-col bg-red-300 w-[100%] h-[100vh]'>
                    
            </div>
        </div>
    );
}
 
export default Profil;