import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { JWT_ADMIN_TOKEN } from "./enums";
import { config } from "./config";

const httpLink = createHttpLink({uri:config.hasuraEndpoint});

const authLink = setContext((_,config ) => {
    const token = localStorage.getItem(JWT_ADMIN_TOKEN);

    if(!token) {
        return config;
    }

    return {
        headers: {
            ...config.headers,
            authorization: `Bearer ${token}`
        }
    }
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache : new InMemoryCache()
});