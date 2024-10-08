import {Button, Input, ScrollShadow} from "@nextui-org/react";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import {useContext} from 'react'
import {UserContext} from '../context/UserContext'
import NotFound from "./NotFound";
import {useState} from 'react'
const MinaAi = () => {
    const {user} = useContext(UserContext);
    const [prompt, setPrompt] = useState('')
    const [prompts, setPrompts] = useState([])
    const [hiddenOnClick, setHiddenOnClick] = useState(false);
    if(!user) return <NotFound/>
    //loading, save prompts, display prompts (user prompt, mina prompt, user prompt, mina prompt, ...)
    const getPrompt = async() => {
        prompts.push(prompt)
        try{
            const res = await fetch('http://localhost:8080/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    prompt
                })
            })
            const data = await res.json()
            if(res.success === false){
                console.log(data.error)
            }else{
                console.log(data)
                setPrompts([...prompts, data.message])
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="minaAi-principal">
            <div className="sidebar-minaAi">
                <div style={{borderBottom:'1px solid white'}}>
                    <h1 style={{
                    background: 'linear-gradient(to right, blue, cyan)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent'
                    }}>MinaAi</h1>
                </div>
                <div className='minaAi-byothpeople'>
                    <div className='flex  flex-col gap-2'>

                        {/* <p style={{fontSize:'2rem', marginTop:'-20px'}}> ... </p> */}
                    </div>
                </div>
                <div className='minaAi-byyou'>
                    <div className='flex  flex-col gap-2'>
                       
                        {/* <p style={{fontSize:'2rem', marginTop:'-20px'}}> ... </p> */}
                    </div>
                </div>
                <div className="sidebar-minaAi-bottompart" style={{borderTop:'1px solid white'}}>
                    <div className='flex flex-row gap-1' style={{cursor:'pointer'}}>
                        <LiveHelpIcon style={{width:'20px', height:'20px', marginTop:'7px'}}/>
                        Help
                    </div>
                    <div className='flex flex-row gap-1' style={{cursor:'pointer'}}>
                        <SettingsIcon style={{width:'20px', height:'20px', marginTop:'7px'}}/>
                        Settings
                    </div>
                </div>
            </div>
            <div className="chat-minaAi">
                <div className="w-[80%] mx-auto">
                    {user ?
                    <p style={{fontSize:'2rem'}}>
                        Welcome, {user.username}!
                    </p>
                    : 
                    <p style={{fontSize:'2rem'}}>
                        Welcome, Newbie!
                    </p>
                    }
                    <p style={{fontSize:'1.2rem'}}>
                        Mina ignites minds with wisdom, making everything brighter...
                    </p>
                    {prompts.length == 0 && (
                                            <div className="flex w-[100%] mx-auto flex-row justify-evenly mt-12 mina-contains-prompt-ideas">
                                            <div className="prompt-ideas-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <div className="pl-4 pt-2 pr-4">
                                                    <p> What are data structures and why are they important in programming?</p>
                                                </div>
                                                <SendIcon className="pb-3 pr-4 iconitaSend" style={{width:'40px', height:'40px', cursor:'pointer'}}
                                                      onMouseEnter={() =>{
                                                        setPrompt("What are data structures and why are they important in programming?");
                                                    }}
                                                    onClick={() =>{
                                                        getPrompt();
                                                        setPrompt('');
                                                    }}/>          
                                            </div>
                                            <div className="prompt-ideas-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <div className="pl-4 pt-2 pr-4">
                                                    <p> What are the differences between object-oriented programming and functional programming?</p>
                                                </div>
                                                <SendIcon 
                                                    onMouseEnter={() =>{
                                                        setPrompt("What are the differences between object-oriented programming and functional programming?");
                                                    }}
                                                    onClick={() =>{
                                                        getPrompt();
                                                        setPrompt('');
                                                    }}
                                                className="pb-3 pr-4 iconitaSend" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                                            </div>
                                            <div className="prompt-ideas-mina prompt-hidden-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <div className="pl-4 pt-2 pr-4">
                                                    <p> What are the most important principles in object-oriented programming?</p>
                                                </div>
                                                <SendIcon 
                                                    onMouseEnter={() =>{
                                                        setPrompt("What are the most important principles in object-oriented programming?");
                                                    }}
                                                    onClick={() =>{
                                                        getPrompt();
                                                        setPrompt('');
                                                    }}
                                                    className="pb-3 pr-4" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                                            </div>
                                            <div className="prompt-ideas-mina prompt-hidden-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                <div className="pl-4 pt-2 pr-4">
                                                    <p> How can you optimize the performance of a web application?</p>
                                                </div>
                                                <SendIcon 
                                                    onMouseEnter={() =>{
                                                        setPrompt("How can you optimize the performance of a web application?");
                                                    }}
                                                    onClick={() =>{
                                                        getPrompt();
                                                        setPrompt('');
                                                    }}
                                                    className="pb-3 pr-4" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                                            </div>
                                        </div>
                    )}
                    <ScrollShadow>
                       {prompts.length !== 0 ? (
                         <div className="flex flex-col gap-5 mt-5 h-[500px]">
                         {prompts.map((prompt, index) => (
                                 <div className="bg-zinc-800 rounded-md">
                                     <p className="p-3">
                                         <pre style={{whiteSpace: 'break-spaces'}}>{prompt}</pre>
                                     </p>
                                 </div>
                             ))}
                        </div>
                       ) : <div></div>}
                    </ScrollShadow>
                </div>
                <Input value={prompt} onChange={(e) => setPrompt(e.target.value)} type="email" size="lg" variant="underlined" label="Message Mina" className="w-[80%] mx-auto"
                endContent={
                    <Button onClick={() => {getPrompt(); setPrompt("")}} size="small" auto icon={<SendIcon/>} className="bg-[#1e90ff] cursor-pointer">Send</Button>
                }
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        getPrompt();
                        setPrompt("");
                    }
                }}
                />
            </div>
        </div>
    );
}
 
export default MinaAi;