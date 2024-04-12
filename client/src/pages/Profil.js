import {useParams, Link} from 'react-router-dom';
import {Avatar} from "@nextui-org/react";

const Profil = () => {
    const {username} = useParams();
    return (
        <div className='contains-profile'>
            <div className='profile-principal'>
                <div className='profile-principal-data'>
                    <div className='profile-principal-data-avatarArea'>
                        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-40 h-40 text-large" />
                        <p> Gigel </p>
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