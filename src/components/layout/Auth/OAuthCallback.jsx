import { useLoginUser } from '@/common/External/Api';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

export default function OAuthCallback() {

    const navigate = useNavigate();
    const {mutateAsync: login} =  useLoginUser();

  useEffect(() => {
   
const userLogin = async () => {

    try {
        
        
const data = await login({
    code: code,
    providerid: 1
});

console.log('resp from login :::: ', data);

    if (data) {
        navigate('/');
    }
    else {
        throw new Error('Login failed');
    }

    } catch (error) {
        console.error('Error during user login:', error);
        navigate('/login');
        
    }
};

 const searchbar = window.location.search;
    const params = new URLSearchParams(searchbar);
    const code = params.get('code');

    console.log('fb return code :: ',code);
    
    if( code != null && code != undefined && code != '')
    {
        userLogin();
    }
    else
    {
        console.error('No code found in the URL');
        navigate('/login');
    }

  },[]);

  return (
    <div>loading......</div>
  )
}
