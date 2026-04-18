"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth0 } from "@auth0/auth0-react";
import apiClient from "@/lib/api";

export const useGetTanstack = (name,enabled = true) => {
    return useQuery({
        queryKey: [name],
        queryFn: async () => {
            const { data } = await apiClient.get(`${name}`);
            return data;
        },
        enabled
    });
};

// TODO get token by getAccessTokenSilently,store in cookies and remove from here
export const useGetAuthTanstack = (name, enabled) => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    return useQuery({
        queryKey: [name],
        queryFn: async () => {
            if (!isAuthenticated) throw new Error("User not authenticated");

            // const token = await getAccessTokenSilently({
            //     audience: process.env.NEXT_PUBLIC_API_AUDIENCE,
            //     // scope: "profile email openid"
            // });
            const token = await getAccessTokenSilently();

            const { data } = await apiClient.get(name, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return data;
        },
        // enabled: !isLoading && isAuthenticated, // V1
        enabled: !isLoading && isAuthenticated && enabled, // V2 (if in details client query is not id)
    });
};

// export const usePostTanstack = (name, options) => {
//     return useMutation({
//         mutationFn: async (body) => {
//             const { data } = await apiClient.post(`${name}`, body);
//             return data;
//         },
//         ...options,
//     });
// };

// TODO get token by getAccessTokenSilently,store in cookies and remove from here
export const useMutateAuthTanstack = (name, method, options) => {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0();

    return useMutation({
        mutationFn: async (body) => {
            if (!isAuthenticated) throw new Error("User not authenticated");

            const token = await getAccessTokenSilently();

            const { data } = await apiClient({
                url: name,
                method,
                data: body,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },
        ...options,
    });
};