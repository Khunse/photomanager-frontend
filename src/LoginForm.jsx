import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { set, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form,FormMessage,FormItem,FormField,FormLabel,FormControl } from './components/ui/form'
import { Checkbox } from './components/ui/checkbox'
import { Link, useNavigate } from 'react-router'
import { useAuthContext } from './context/AuthContext'
import { useGetCurrentUser, useLoginUser } from './External/Api'

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

    const {mutateAsync: loginUserAction} = useLoginUser();
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
