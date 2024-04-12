import {useParams, Link} from 'react-router-dom';
import {Avatar} from "@nextui-org/react";
import { useState } from 'react';
import uploadImage from '../assets/uploadImage.png'

const Profil = () => {
    const [isHovered, setIsHovered] = useState(false);
    const {username} = useParams();
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