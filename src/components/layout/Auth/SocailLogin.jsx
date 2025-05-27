import { GoogleLogin } from "@react-oauth/google"
import { useAuthContext } from "../../../common/context/AuthContext"

export const CGoogleLogin = () =>{

    const {CheckUserAuth} = useAuthContext();
    return(
        <>
            <h1>Google Login</h1>
            <p>Login with Google</p>
           <GoogleLogin 
           onSuccess={(response => {
            
            console.log("success ",response.credential)
            // CheckUserAuth();
            localStorage.setItem('token', response.credential)
           })}
              onError={(error => console.log("error ",error))}
                onFailure={(error => console.log("failure ",error))}
           />
        </>
    )
}