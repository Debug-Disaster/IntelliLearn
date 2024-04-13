import {useParams, Link} from 'react-router-dom';
import {Avatar, Button, Chip} from "@nextui-org/react";
import uploadImage from '../assets/uploadImage.png'
import {useEffect, useState} from 'react'
import {useGetUser} from '../hooks/useGetUser'
import { useGetProfile } from '../hooks/useGetProfile';
import NotFound from './NotFound';
const Profil = () => {
    const [isHovered, setIsHovered] = useState(false);
    const {username} = useParams();
    const {data: userProfile, error, isLoading} = useGetProfile(username);
<<<<<<< Updated upstream
    console.log(userProfile);
    if(!userProfile)
        return <NotFound/>
=======
>>>>>>> Stashed changes
    return (
        <div className='flex flex-row max-md:flex-col gap-5 m-5 h-[100%]'>
            <div className='flex flex-col w-[40%] max-md:w-[100%] h-[100vh]' style={{backgroundColor:'#272C33', borderRadius:'16px'}}>
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
                        <p className='mx-auto mt-2 mb-4' style={{fontSize:'2.5rem', textAlign:'center'}}> {userProfile.username} </p>
                    </div>
                    <div className='contains-tags-profile w-[100%]'>
                        <Chip color='primary'>Cybersecurity</Chip>
                        <Chip color='primary'>Mentor</Chip>
                        <Chip color='primary'>Founder</Chip>
                    </div> 
                    <div className='flex flex-col gap-2 mx-auto w-[100%] text-white p-5'>
                        <div>
                            <p style={{fontWeight:'bold'}}>About me</p>
                            <p>{userProfile.bio}</p>
                        </div>
                        <div className='flex flex-col gap-2 mt-5'>
                        <div className='info-profile-div'>
                            <p style={{fontWeight:'bold'}}>Full name</p>
                            <p>Gigel Alexandrescu</p>
                        </div>
                        <div className='info-profile-div'>
                            <p style={{fontWeight:'bold'}}>Age</p>
                            <p>30</p>
                        </div>
                        <div className='info-profile-div'>
                            <p style={{fontWeight:'bold'}}>Gender</p>
                            <p>Male</p>
                        </div>
                        {userProfile.role==="mentor" ?
                            <div className='info-profile-div'>
                                <p style={{fontWeight:'bold'}}>Major in</p>
                                <p>{userProfile.major}</p>
                            </div>
                            :
                            <div className='info-profile-div'>
                                <p style={{fontWeight:'bold'}}>School</p>
                                <p>{userProfile.school}</p>
                            </div>
                        }
                        </div>
                    </div> 
            </div>
            <div className='flex w-[100%] h-[100vh]' style={{flexDirection:'column', justifyContent:'space-between'}}>
                <div style={{width:'100%', height:'50px', backgroundColor:'#272C33', borderRadius:'16px'}}>

                </div>
                <div className='divProfil-rest'>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Profil;