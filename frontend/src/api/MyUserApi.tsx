import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    auth0Id: string;
    email: string;
};

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
        return await response.json();
    };

    const mutation = useMutation({
        mutationFn: createMyUserRequest, // Pass mutation function using mutationFn
    });

    console.log(mutation);
    
    return {
        createUser: mutation.mutateAsync, // Function to call the mutation
        isLoading: mutation.isLoading,    // Loading state
        isError: mutation.isError,        // Error state
        isSuccess: mutation.isSuccess,    
    };
};
