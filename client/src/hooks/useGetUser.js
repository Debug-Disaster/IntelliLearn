import { useQuery } from "@tanstack/react-query";
export const useGetUser = (id) => {
  const fetchUser = async () => {
    const req = await fetch(`http://localhost:8080/user/getUser/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    if (!data.success) {
      throw new Error(data.error);
    }
    return data.user;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: "getUser",
    queryFn: () => fetchUser(),
  });
  return { data, error, isLoading };
};