import {Input} from "@nextui-org/react";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SettingsIcon from '@mui/icons-material/Settings';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import {useContext} from 'react'
import {UserContext} from '../context/UserContext'

const MinaAi = () => {
    const {user} = useContext(UserContext);
    console.log(user);
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
                    <p style={{paddingBottom:'5px'}} >New generations:</p>
                    <div className='flex  flex-col gap-2'>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 1
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 2
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 3
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 4
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 5
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Pisoi 6
                        </div>
                        {/* <p style={{fontSize:'2rem', marginTop:'-20px'}}> ... </p> */}
                    </div>
                </div>
                <div className='minaAi-byyou'>
                    <p style={{paddingBottom:'5px'}}>Your generations:</p>
                    <div className='flex  flex-col gap-2'>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 1
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 2
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 3
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 4
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 5
                        </div>
                        <div className='flex gap-2 pl-2' style={{cursor:'pointer'}}>
                            <ChatBubbleOutlineIcon/>
                            Elefant 6
                        </div>
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
                    <div className="flex w-[80%] mx-auto flex-row justify-between mt-12">
                        <div className="prompt-ideas-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="pl-4 pt-2 pr-4">
                                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <SendIcon className="pb-3 pr-4" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                        </div>
                        <div className="prompt-ideas-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="pl-4 pt-2 pr-4">
                                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <SendIcon className="pb-3 pr-4" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                        </div>
                        <div className="prompt-ideas-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="pl-4 pt-2 pr-4">
                                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <SendIcon className="pb-3 pr-4" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                        </div>
                        <div className="prompt-ideas-mina" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div className="pl-4 pt-2 pr-4">
                                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <SendIcon className="pb-3 pr-4" style={{width:'40px', height:'40px', cursor:'pointer'}}/>
                        </div>
                    </div>
                </div>
                <Input type="email" size="lg" variant="underlined" label="Message Mina" className="w-[80%] mx-auto"
                endContent={
                <div className="pointer-events-none flex items-center">
                    <SendIcon/>
                </div>
                }/>
            </div>
        </div>
    );
}
 
export default MinaAi;