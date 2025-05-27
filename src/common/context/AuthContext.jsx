import { useGetCurrentUser } from '@/common/External/Api';
import React, { createContext, useContext,useState, useEffect } from 'react'
import { useNavigate } from 'react-router';

const AuthContext = createContext();

export const AuthProvider =  ({ children }) => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {refetch: getcurrentuser,isFetching} = useGetCurrentUser();

    const handleUnauthorized = () => {
        // Handle unauthorized access here (e.g., redirect to login page)
        console.log('Unauthorized access detected. Redirecting to login...');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
    }
 const CheckUserAuth = async () => {

    try {
            setIsLoading(true);
        const token =  localStorage.getItem('token');
         
         if(!token){
             await new Promise((resolve) => setTimeout(resolve, 100)); // Simulate a network request
            setIsAuthenticated(false);
            // navigate('/login');
            return false;
        }
        else{
            // const userInfo = await getcurrentuser();
            setIsAuthenticated(true);
            return true;
        }
        
    } catch (error) {

        console.error('Error checking user authentication:', error);
        setIsAuthenticated(false);
    return false;    
    } 
    finally {

        setIsLoading(false);
    }
    
};

useEffect(() => {

    const token =  localStorage.getItem('token');
    console.log('token ;;; ', token);

    const searchbar = window.location.search;
    const params = new URLSearchParams(searchbar);
    const code = params.get('code');

    console.log('return code :: ',code);

    if(!token){
        // navigate('/login');
    }

    CheckUserAuth();
    
}, []);

if(isLoading){
    return <div>Loading...</div>
}

const authValue = {
    CheckUserAuth,
    handleUnauthorized,
    isAuthenticated
}

return (

    <AuthContext.Provider value={authValue}>
       {children }
    </AuthContext.Provider>
)
}

export const useAuthContext = () => useContext(AuthContext);
