import { useQuery } from "@tanstack/react-query";
export const useGetClassroom = (id) => {
  const fetchClassrooms = async () => {
    const req = await fetch(`http://localhost:8080/classroom/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    if (data.error) {
      throw new Error(data.error);
    }
    return data.classroomData;
  };
  const { data, error, isLoading } = useQuery({
    queryKey: "getClassroom",
    queryFn: () => fetchClassrooms(),
  });
  return { data, error, isLoading };
};