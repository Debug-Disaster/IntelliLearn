import LiveHelpIcon from '@mui/icons-material/LiveHelp';

const MinaAi = () => {
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
                <div className="sidebar-minaAi-bottompart">
                    <div className='flex flex-row'>
                        Help
                    </div>
                    <div>
                        Settings
                    </div>
                </div>
            </div>
            <div className="chat-minaAi">

            </div>
        </div>
    );
}
 
export default MinaAi;