import {useParams, Link} from 'react-router-dom';
import {Avatar} from "@nextui-org/react";
import { useState } from 'react';
import uploadImage from '../assets/uploadImage.png'
import {useEffect, useState} from 'react'

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
    return (
        <div className='contains-profile'>
            <div className='profile-principal'>
                <div className='profile-principal-data'>
                    <div className='profile-principal-data-avatarArea'>
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
                            className="w-40 h-40 text-large" />
                        <p> Gigel </p>
                    </div>
                    <div className='profile-principal-data-tagsArea'>
                        <p className='tagProfil' style={{backgroundColor:'#23A82E'}}> Tag 1 </p>
                        <p className='tagProfil' style={{backgroundColor:'#7E2EFF'}}> Tag 2 </p>
                        <p className='tagProfil' style={{backgroundColor:'#F5A524'}}> Tag 3 </p>
                    </div>
                </div>
                <div className='profile-principal-rest'>
                    <div className='basic-info flex row' >
                        <h1>Full name</h1>
                        <h2>Gigel Alexandrescu</h2>
                    </div>
                    <div className='basic-info' >
                        <h1>Status</h1>
                        <h2>Mentro</h2>
                    </div>
                    <div className='basic-info' >
                        <h1>Age</h1>
                        <h2>23</h2>
                    </div>
                    <div className='basic-info' >
                        <h1>Gender</h1>
                        <h2>Male</h2>
                    </div>
                    <div className='basic-info' >
                        <h1>Job/Education</h1>
                        <h2>Piscolt highschool</h2>
                    </div>
                    <div className='basic-info' style={{fontWeight:'bold'}} >
                        <h1>Zone of expertise</h1>
                        <h2>Full snack developer</h2>
                    </div>

                </div>
            </div>
            <div className='profile-secundar'>
                <div className='internal-navbar'>

                </div>
                <div className='profile-secundar-views'>

                </div>
            </div>
        </div>
    );
}
 
export default Profil;