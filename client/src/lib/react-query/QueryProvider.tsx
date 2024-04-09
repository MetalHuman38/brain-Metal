import { QueryClient, QueryClientProvider } from 'react-query'

export const QueryProvider = ({ children }: { children: React.ReactNode}) => {
    const queryClient = new QueryClient(); // Create an instance of QueryClient
    return (
        <QueryClientProvider client={queryClient}> 
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider