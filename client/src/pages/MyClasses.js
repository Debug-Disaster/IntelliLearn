import { useContext } from "react";
import {UserContext} from "../context/UserContext";
import { useGetMyClasses } from "../hooks/useGetMyClasses";
import NotFound from "./NotFound"
import Error from "../components/Error";
import {Link, useNavigate} from 'react-router-dom';
const MyClasses = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const { data, error, isLoading } = useGetMyClasses(user ? user.username : "");
    if(isLoading)
        return <div>Loading...</div>
    if(!user)
        return <NotFound/>
    if(!data)
        return <NotFound/>
    return (
/*         <div className="view-your-classes">
            <div style={{width:'50%'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                <div className="flex items-center justify-center w-full h-full p-5">
                <div className="grid gap-4 bg-white rounded-lg overflow-hidden w-full shadow-lg dark:bg-gray-900">
                    <div className="p-4 grid gap-2">
                    <h2 className="text-lg font-semibold">Introduction to Computer Science</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Learn the basics of programming with Python</p>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="p-4 grid gap-2">
                    <h3 className="text-sm font-medium">Mentor</h3>
                    <div className="flex items-center gap-2">
                        <img
                        alt="Mentor avatar"
                        className="rounded-full"
                        height="32"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                        }}
                        width="32"
                        />
                        <div className="text-sm font-medium">Sarah Thompson</div>
                    </div>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="p-4 grid gap-2">
                    <h3 className="text-sm font-medium">Details</h3>
                    <dl className="grid gap-1 text-sm">
                        <div className="flex justify-between">
                        <dt className="font-medium">Created at</dt>
                        <dd>April 3, 2024</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Status</dt>
                        <dd>Public</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Undone assignments</dt>
                        <dd>2</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Participants</dt>
                        <dd>7</dd>
                        </div>
                    </dl>
                    </div>
                </div>
                </div>

                <div className="flex items-center justify-center w-full h-full p-5">
                <div className="grid gap-4 bg-white rounded-lg overflow-hidden w-full shadow-lg dark:bg-gray-900">
                    <div className="p-4 grid gap-2">
                    <h2 className="text-lg font-semibold">Introduction to Computer Science</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Learn the basics of programming with Python</p>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="p-4 grid gap-2">
                    <h3 className="text-sm font-medium">Mentor</h3>
                    <div className="flex items-center gap-2">
                        <img
                        alt="Mentor avatar"
                        className="rounded-full"
                        height="32"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                        }}
                        width="32"
                        />
                        <div className="text-sm font-medium">Sarah Thompson</div>
                    </div>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="p-4 grid gap-2">
                    <h3 className="text-sm font-medium">Details</h3>
                    <dl className="grid gap-1 text-sm">
                        <div className="flex justify-between">
                        <dt className="font-medium">Created at</dt>
                        <dd>April 3, 2024</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Status</dt>
                        <dd>Public</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Undone assignments</dt>
                        <dd>2</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Participants</dt>
                        <dd>7</dd>
                        </div>
                    </dl>
                    </div>
                </div>
                </div>
                </div>
            </div>
            <div style={{width:'50%'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                <div className="flex items-center justify-center w-full h-full p-5">
                <div className="grid gap-4 bg-white rounded-lg overflow-hidden w-full shadow-lg dark:bg-gray-900">
                    <div className="p-4 grid gap-2">
                    <h2 className="text-lg font-semibold">Introduction to Computer Science</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Learn the basics of programming with Python</p>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="p-4 grid gap-2">
                    <h3 className="text-sm font-medium">Mentor</h3>
                    <div className="flex items-center gap-2">
                        <img
                        alt="Mentor avatar"
                        className="rounded-full"
                        height="32"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                        }}
                        width="32"
                        />
                        <div className="text-sm font-medium">Sarah Thompson</div>
                    </div>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="p-4 grid gap-2">
                    <h3 className="text-sm font-medium">Details</h3>
                    <dl className="grid gap-1 text-sm">
                        <div className="flex justify-between">
                        <dt className="font-medium">Created at</dt>
                        <dd>April 3, 2024</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Status</dt>
                        <dd>Public</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Undone assignments</dt>
                        <dd>2</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Participants</dt>
                        <dd>7</dd>
                        </div>
                    </dl>
                    </div>
                </div>
                </div>

                <div className="flex items-center justify-center w-full h-full p-5">
                <div className="grid gap-4 bg-white rounded-lg overflow-hidden w-full shadow-lg dark:bg-gray-900">
                    <div className="p-4 grid gap-2">
                    <h2 className="text-lg font-semibold">Introduction to Computer Science</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Learn the basics of programming with Python</p>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="p-4 grid gap-2">
                    <h3 className="text-sm font-medium">Mentor</h3>
                    <div className="flex items-center gap-2">
                        <img
                        alt="Mentor avatar"
                        className="rounded-full"
                        height="32"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                        }}
                        width="32"
                        />
                        <div className="text-sm font-medium">Sarah Thompson</div>
                    </div>
                    </div>
                    <div className="border-t border-gray-200" />
                    <div className="p-4 grid gap-2">
                    <h3 className="text-sm font-medium">Details</h3>
                    <dl className="grid gap-1 text-sm">
                        <div className="flex justify-between">
                        <dt className="font-medium">Created at</dt>
                        <dd>April 3, 2024</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Status</dt>
                        <dd>Public</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Undone assignments</dt>
                        <dd>2</dd>
                        </div>
                        <div className="flex justify-between">
                        <dt className="font-medium">Participants</dt>
                        <dd>7</dd>
                        </div>
                    </dl>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div> */
        <div>
            {data.length === 0 ? <h1 className="text-4xl font-bold m-10">You have no classes yet. Would you like to enroll in classes? <Link className="text-indigo-400" to={'/classrooms/join'}>Click here!</Link></h1> : <h1 className="text-4xl font-bold m-10"> This is where you found the classes you enrolled in! </h1>}
            <div className="container mx-auto h-[100vh] my-5 grid grid-cols-2 gap-5">
                {error && <Error error={error} />}
                {isLoading && <h1>Loading...</h1>}
                {data && data.map((classroom, index) => {
                    return (
                        <div key={index} onClick={() =>navigate(`/classrooms/view/${classroom._id}`)}className="grid gap-4 bg-white rounded-lg overflow-hidden w-full shadow-lg dark:bg-gray-900">
                            <div className="p-4 grid gap-2">
                                <h2 className="text-lg font-semibold">{classroom.subject}</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{classroom.description}</p>
                            </div>
                            <div className="border-t border-gray-200" />
                            <div className="p-4 grid gap-2">
                                <h3 className="text-sm font-medium">Mentor</h3>
                                <div className="flex items-center gap-2">
                                    <img
                                        alt="Mentor avatar"
                                        className="rounded-full"
                                        height="32"
                                        src="/placeholder.svg"
                                        style={{
                                            aspectRatio: "32/32",
                                            objectFit: "cover",
                                        }}
                                        width="32"
                                    />
                                    <div className="text-sm font-medium">{classroom.mentor}</div>
                                </div>
                            </div>
                            <div className="border-t border-gray-200" />
                            <div className="p-4 grid gap-2">
                                <h3 className="text-sm font-medium">Details</h3>
                                <div className="grid gap-1 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="font-medium">Created at</dt>
                                        <dd>{classroom.createdAt}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="font-medium">Status</dt>
                                        <dd>{classroom.status}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="font-medium">Undone assignments</dt>
                                        <dd>{classroom.assignments && classroom.assignments.length !== undefined ? classroom.assignments.length : 0}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="font-medium">Participants</dt>
                                        <dd>{classroom.students && classroom.students.length !== undefined ? classroom.students.length : 0}</dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
 
export default MyClasses;