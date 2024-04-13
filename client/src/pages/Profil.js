import {useParams, Link, useNavigate} from 'react-router-dom';
import {Avatar, Button, Chip, Input} from "@nextui-org/react";
import uploadImage from '../assets/uploadImage.png'
import {useEffect, useState} from 'react'
import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import {useGetUser} from '../hooks/useGetUser'
import { useGetProfile } from '../hooks/useGetProfile';
import NotFound from './NotFound';

export const EyeFilledIcon = (props) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.25 9.14969C18.94 5.51969 15.56 3.42969 12 3.42969C10.22 3.42969 8.49 3.94969 6.91 4.91969C5.33 5.89969 3.91 7.32969 2.75 9.14969C1.75 10.7197 1.75 13.2697 2.75 14.8397C5.06 18.4797 8.44 20.5597 12 20.5597C13.78 20.5597 15.51 20.0397 17.09 19.0697C18.67 18.0897 20.09 16.6597 21.25 14.8397C22.25 13.2797 22.25 10.7197 21.25 9.14969ZM12 16.0397C9.76 16.0397 7.96 14.2297 7.96 11.9997C7.96 9.76969 9.76 7.95969 12 7.95969C14.24 7.95969 16.04 9.76969 16.04 11.9997C16.04 14.2297 14.24 16.0397 12 16.0397Z"
        fill="currentColor"
      />
      <path
        d="M11.9984 9.14062C10.4284 9.14062 9.14844 10.4206 9.14844 12.0006C9.14844 13.5706 10.4284 14.8506 11.9984 14.8506C13.5684 14.8506 14.8584 13.5706 14.8584 12.0006C14.8584 10.4306 13.5684 9.14062 11.9984 9.14062Z"
        fill="currentColor"
      />
    </svg>
  );

export const EyeSlashFilledIcon = (props) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
        fill="currentColor"
      />
      <path
        d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
        fill="currentColor"
      />
      <path
        d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
        fill="currentColor"
      />
      <path
        d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
        fill="currentColor"
      />
      <path
        d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
        fill="currentColor"
      />
    </svg>
  );

const Profil = () => {
    const [isVisible, setIsVisible] = useState(false)
    const toggleVisibility = () => setIsVisible(!isVisible);

    const [isVisible2, setIsVisible2] = useState(false);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);
    const [isHovered, setIsHovered] = useState(false);
    const {username, action} = useParams();
    const {user} = useContext(UserContext);
    const {data: userProfile, error, isLoading} = useGetProfile(username);
    console.log(userProfile);
    if(!userProfile)
        return <NotFound/>
    console.log(action);
    if(action !== undefined && action !== 'Settings' && action !== 'Activity' && action !== 'Classrooms')
        return <NotFound/>
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
                        }   style={{cursor:'pointer', margin:'0 auto'}}
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
                <div  style={{width:'100%', height:'50px', backgroundColor:'#272C33', borderRadius:'16px'}}>
                    <div className="navbar-profile">
                        {user && userProfile && user.username === userProfile.username &&
                        <div>
                            <Link to={`/profile/${userProfile.username}/Settings`}>
                                Settings
                            </Link>
                        </div>
                        }
                        <div>
                            <Link to={`/profile/${userProfile.username}/Activity`}>
                                Activity
                            </Link>
                        </div>
                        <div>
                            <Link to={`/profile/${userProfile.username}/Classrooms`}>
                                Classrooms
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='divProfil-rest'>
                    {action === 'Settings' &&
                        <div>
                        <div className="mx-auto max-w-sm space-y-4">
                        <div className="space-y-2">
                          <h2 className="text-2xl font-bold">Change Password</h2>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Input
                            label="Password"
                            variant="bordered"
                            placeholder="Old Password"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            />
                          </div>
                          <div className="space-y-2">
                            <Input
                            label="Password"
                            variant="bordered"
                            placeholder="New Password"
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                                {isVisible2 ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                                </button>
                            }
                            type={isVisible2 ? "text" : "password"}
                            />
                          </div>
                          <Button className="w-full"  variant="bordered" color="default">Change Password</Button>
                        </div>
                      </div>
                      <div className="mx-auto max-w-sm space-y-4 mt-5">
                        <div className="space-y-2">
                          <h2 className="text-2xl font-bold">Change Email</h2>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Input type="email" variant="bordered" label="Current Email" />
                          </div>
                          <div className="space-y-2">
                            <Input type="email" variant="bordered" label="New Email" />
                          </div>
                          <Button className="w-full" variant="bordered" color="default">Change Email</Button>
                        </div>
                      </div>
                      </div>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Profil;