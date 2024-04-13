import { useQuery } from "@tanstack/react-query";

export const useGetMessages = (id) => {
    const fetchMessages = async() => {
        try{
            const res = await fetch(`http://localhost:8080/classroom/messages/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            const data = await res.json()
            if(res.success === false){
                console.log(data.error)
            }else{
                return data.messages
            }
        }catch(err){
            console.log(err)
        }
    }
    const {data, error, isLoading} = useQuery({
        queryKey: 'messages',
        queryFn: () => fetchMessages()
    })
    return {data, error, isLoading}
}