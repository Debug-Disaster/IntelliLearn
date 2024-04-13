import { useQuery } from "@tanstack/react-query";
export const useGetClassrooms = (id) => {
  const fetchClassrooms = async () => {
    const req = await fetch(`http://localhost:8080/classroom/${id}`, {
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
    queryKey: "getClassroom",
    queryFn: () => fetchClassrooms(),
  });
  return { data, error, isLoading };
};