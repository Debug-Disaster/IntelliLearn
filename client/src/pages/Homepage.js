import { Link } from "react-router-dom";
import {Button} from '@nextui-org/react'
const Homepage = () => {
    return (
        <div className="container mx-auto mt-[100px] h-[100vh]">
            <div className="flex flex-row gap-2 max-md:flex-col justify-between max-md:justify-start">
                <div className="flex flex-col gap-5 flex-1">
                        <div className="text-5xl text-white font-extrabold">
                        🚀 Welcome to{' '}
                        <span style={{
                                background: 'linear-gradient(to right, blue, cyan)',
                                WebkitBackgroundClip: 'text',
                                color: 'transparent'
                                }}>
                            IntelliLearn!
                        </span>{' '}
                        Your ultimate hub for learning programming.
                        </div>
                        <div>
                            IntelliLearn its about education. We provide you with the best resources to learn programming. 
                            <br />
                            You can solve problems, read articles, and learn programming languages.
                            <br />
                            By joining the classrooms, you can learn from the best mentors and get the best resources.
                        </div>
                </div>
            <div className="flex-1 flex flex-col gap-5 items-end pt-4">
                <Button variant="flat"  onClick={() => window.location.href = '/classrooms'}class="bg-black border-2 transiton ease-out duration-300 border-blue-700 rounded px-6 py-2 hover:bg-blue-700 hover:text-white">View Classrooms</Button>
                {/* <Link to="/signin">
                    <Button variant="flat" class="bg-black border-2 transiton ease-out duration-300 border-blue-700 rounded px-6 py-2 hover:bg-blue-700 hover:text-white" >Add feedback</Button>
                </Link>
                <Link to="/signup">
                    <Button variant="flat" class="bg-black border-2 transiton ease-out duration-300 border-blue-700 rounded px-6 py-2 hover:bg-blue-700 hover:text-white" >Contact</Button>
                </Link> */}
            </div>
        </div>
        <br />
        <div className="flex flex-col items-center mt-10">
            <div className="text-3xl font-bold">Why IntelliLearn?</div>
            <div className="flex flex-row gap-5 mt-5">
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">📚</div>
                    <div className="text-xl font-bold">Resources</div>
                    <div>Get the best resources to learn programming.</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">👨‍🏫</div>
                    <div className="text-xl font-bold">Mentors</div>
                    <div>Learn from the best mentors in the world.</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">🔥</div>
                    <div className="text-xl font-bold">Challenges</div>
                    <div>Solve problems and challenges to improve your skills.</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold">🚀</div>
                    <div className="text-xl font-bold">Free</div>
                    <div>IntelliLearn is free for everyone.</div>
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default Homepage;