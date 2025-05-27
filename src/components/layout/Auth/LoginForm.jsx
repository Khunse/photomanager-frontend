import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../../ui/card'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form,FormMessage,FormItem,FormField,FormLabel,FormControl } from '../../ui/form'
import { Checkbox } from '../../ui/checkbox'
import { Link, useNavigate } from 'react-router'
import { useAuthContext } from '../../../common/context/AuthContext'
import { useGetCurrentUser, useLoginUser } from '../../../common/External/Api'
import { CGoogleLogin } from './SocailLogin'
import { toast } from 'sonner'

export default function LoginForm() {

    const [showpassword,SetShowpassword] = React.useState(false);
    const navigate = useNavigate();
    const { CheckUserAuth } = useAuthContext();
    const formSchema = z.object({
      email: z.string().email('Invalid email address').min(1, 'Email is required'),
      password: z.string().min(8, 'Password must be at least 8 characters long').min(1, 'Password is required'),
    });
    
    const [loginInfo,setLoginInfo] = React.useState({
        email: '',
        password: ''
    });

    const {mutateAsync: loginUserAction,isError,error} = useLoginUser();
    const myform = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => { 
        console.log(data);

        setLoginInfo({
            email: data.email,
            password: data.password
        });
        const isAuthenticated = await loginUserAction({
            email: data.email,
            password: data.password
        });
        
        console.log('loginInfo :::: ', loginInfo);
        console.log('loginData :::: ', isAuthenticated);

        if(isAuthenticated)
        {
          navigate('/');
        }
        

  }

  useEffect(() => {
   

    if(isError)
    {
      toast(error.name,{
                         description: error.message,
                         duration: 3000,
                       })
    }
    else
    {
 const searchbar = window.location.search;
    const params = new URLSearchParams(searchbar);
    const code = params.get('code');

    console.log('fb return code :: ',code);
    }
  },[isError]);

const appid = 1091286722716985;
const gclient_id = "887087555913-8h2b7v4ik4v5t3016qkm9ljpk6lc9rt2.apps.googleusercontent.com";
const redirect_uri = "http://localhost:5173/auth/callback";
  const facebookLogin= () =>{
    window.location.assign(`https://facebook.com/dialog/oauth?app_id=${appid}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=email,public_profile`);
  }

  const googleLogin = () => {
    window.location.assign(`https://accounts.google.com/o/oauth2/v2/auth?client_id=${gclient_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&prompt=consent+select_account&response_type=code&scope=email%20profile`);
  }

  return (
    <Form {...myform} >
    <form onSubmit={myform.handleSubmit(onSubmit)} className='flex items-center justify-center h-screen bg-gray-100' >
    <Card className="w-full max-w-md grid gap-4">
        <CardHeader>
            <h2 className="text-2xl font-bold">Login</h2>
            <p className="text-sm text-muted-foreground">Please enter your credentials</p>
        </CardHeader>
        <CardContent className={"grid gap-4"}>

        <FormField
              control={myform.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="m@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


<FormField
              control={myform.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type={ showpassword ? "text" : "password"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />  

            {/* <Input type="password" placeholder="Password" className="mb-4" /> */}
            <div className='flex items-center gap-4'>
                        <Checkbox id="showpassword" 
                  onClick={() => SetShowpassword(!showpassword)}/><label htmlFor="showpassword">Show Password</label>
                        </div>

        </CardContent>
        <CardFooter>
            <div className='w-full grid gap-4'>
            <Button className='w-full'>Login</Button>
            {/* <CGoogleLogin /> */}
            <Button onClick={googleLogin}>Google Login</Button>
            <Button onClick={facebookLogin}>Facebook Login</Button>
            <p>
                Don't have an account? <Link to='/signup' className="text-blue-500 hover:underline">Sign up</Link>
            </p>
            </div>
        </CardFooter>
    </Card>
    </form>
    </Form>
  )
}
