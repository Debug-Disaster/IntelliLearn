import { useQuery } from "@tanstack/react-query";
export const useGetUser = (id) => {
  const fetchUser = async (id) => {
    const req = await fetch(`http://localhost:8080/user/getUser`, {
      method: "GET",
      credentials: "include",
    });
    const data = await req.json();
    if (!data.success) {
      throw new Error(data.error);
    }
    return data.classrooms;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: "getUser",
    queryFn: () => fetchUser(),
  });
  return { data, error, isLoading };
};