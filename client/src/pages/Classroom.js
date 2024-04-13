import joinClassroom from '../assets/joinClassroom.gif'
import myClassrooms from '../assets/myClassrooms.gif'
import mentor from '../assets/mentor.gif'
import {Avatar} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom'

const Classroom = () => {
    const navigate = useNavigate();
    return (
        <div>
        <div className="select-classroom-category">
            <div onClick={() => navigate('/classroom/myclasses')}>
                <Avatar style={{marginTop:'-75px', marginBottom:'20px'}}radius="sm" isBordered src={myClassrooms} className="w-60 h-60 text-large"/>
                <p>Your classrooms</p>
            </div>
            <div onClick={() => navigate('/classroom/join')}>
                <Avatar style={{marginTop:'-75px', marginBottom:'20px'}}radius="sm" isBordered src={joinClassroom} className="w-60 h-60 text-large"/>
                <p>Join classroom</p>
            </div>
            <div onClick={() => navigate('/classroom/create')}>
                <Avatar style={{marginTop:'-75px', marginBottom:'20px'}}radius="sm" isBordered src={mentor} className="w-60 h-60 text-large"/>
                <p>Create classroom</p>
            </div>
        </div>
        <div className="select-classroom-category-mb" style={{display:'none'}}>
            <div onClick={() => navigate('/classroom/myclasses')}>
                <div className='tomodifyclassrooms' style={{width:'80%', display:'flex', justifyContent:'space-between'}}>
                    <Avatar radius="sm" isBordered src={myClassrooms} className="w-40 h-40 text-large"/>
                    <p> Your classrooms</p>
                </div>
            </div>
            <div onClick={() => navigate('/classroom/join')}>
                <div className='tomodifyclassrooms' style={{width:'80%', display:'flex', justifyContent:'space-between'}}>
                    <Avatar radius="sm" isBordered src={joinClassroom} className="w-40 h-40 text-large"/>
                    <p> Join classroom</p>
                </div>
            </div>
            <div onClick={() => navigate('/classroom/create')}>
                <div className='tomodifyclassrooms' style={{width:'80%', display:'flex', justifyContent:'space-between'}}>
                    <Avatar radius="sm" isBordered src={mentor} className="w-40 h-40 text-large"/>
                    <p> Create classroom</p>
                </div>
            </div>
        </div>
        </div>
    );
}
 
export default Classroom;