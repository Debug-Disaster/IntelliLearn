import {useEffect, useState} from 'react';

const SignUp = () => {
    const [last_name, setLast_name] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');

    const getRole = (Role) =>{
        setRole(Role);
    }
    return (
        <div style={{display:'flex', backgroundColor: '#0F0E0E'}}>
            {!role &&
            <div className="dialog-signup">
                <div onClick={() => getRole("student")}>
                    Student
                </div>
                <div onClick={() => getRole("mentor")}>
                    Mentor
                </div>
            </div>
            }
            {role &&
            <div className='signUp-div'>
                <p className='signUp-create-account-text'>
                    CREATE ACCOUNT
                </p>
            </div>
            }
        </div>
    );
}
 

/*
    "last_name": "sofian",
    "first_name": "adelin",
    "password": "a90729d8d5678a48e8d8ff2e86899a1fdaa7f890fbf8c213a62a7b4ae5742e29",
    "email": "adelinmihai071@gmail.com",
    "role": "student",
    "status": "aa"
*/
export default SignUp;