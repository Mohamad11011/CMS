import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getAllUsers } from "../services/getAllUsers";
import { User } from "../types/user";

interface UseGetAllUsersResult {
  data: User[] | undefined;
  isLoading: boolean;
  error: Error | null;
}

export default function useGetAllUsers(): UseGetAllUsersResult {
  const query: UseQueryResult<User[], Error> = useQuery({
    queryKey: ["USERS"],
    queryFn: getAllUsers,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
