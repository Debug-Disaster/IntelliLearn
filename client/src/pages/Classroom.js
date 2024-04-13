import joinClassroom from '../assets/joinClassroom.gif'
import myClassrooms from '../assets/myClassrooms.gif'
import mentor from '../assets/mentor.gif'
import {Avatar} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom'

const Classroom = () => {
    const navigate = useNavigate();
    return (
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
    );
}
 
export default Classroom;