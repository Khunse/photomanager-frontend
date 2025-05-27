
import { useAuthContext } from '@/common/context/AuthContext';
import { Description } from '@radix-ui/react-dialog';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { AuthRequiredError, ServerError } from './exception';

const baseUrl = import.meta.env.VITE_API_URL;

export  const  useGetCurrentUser = () => {

        const fetchdata = async(userEmail)=>{

            
            try {
                
                const resp = await globalFetch(`${baseUrl}/getcurrentuser`,'POST',{}, {Email: userEmail});
    
                console.log('resp from get current user :::: ', resp);
            
    
            return resp;

         } catch (error) {
          console.error('Error fetching data:', error);
          return null;  
         }
    }

    const result = useQuery({
        queryKey: ['currentuser'],
        queryFn: fetchdata,
        enabled: false,
        retry: 0,
    });

  return result;
}

export const useLoginUser = ()=>{


   const userLogin = async ({email,password,code='',providerid=0}) => {

    const loginReq = {
        Email: email,
        Password: password,
        Code: code,
        ProviderId: providerid
    };

    const resp = await globalFetch(`${baseUrl}/login`,'POST',{}, loginReq);
    console.log('resp from login :::: ', resp);

    if(resp.isSuccess)
    {
        localStorage.setItem('token', resp.resp.token);
    }
    return resp.isSuccess;
   };

   const result = useMutation({
    mutationFn: userLogin
   });

 return result;
}

export const useSignupUser = () => {

    const userSignup = async ({email,password,confirmPassword}) => {
        const resp = await globalFetch(`${baseUrl}/register`,'POST',{}, {Req: {
            Email: email,
            Password: password,
            ConfirmPassword: confirmPassword
        }});
        console.log('resp from signup :::: ', resp);
        return resp.isSuccess;
    }

    const result = useMutation({
        mutationFn: userSignup
    });

    return result;
}


export const useGetTempUploadUrl = () => {
const {handleUnauthorized} = useAuthContext();
    const addData = async (img) => {
        try {

            console.log('adding images...')
            console.log("imgFiles :::: ", img);

            const resp = globalFetch(`${baseUrl}/images/generateTempUploadUrl`,'POST',{}, {Req: {
                Description : "test",
                imageUrls : img
            }},handleUnauthorized);
            console.log('data from api call backend ::  ', resp);
            return resp;
        } catch (error) {
            console.error('Error uploading file:', error)
        
            return null;
        }
    }

    const result = useMutation({
        mutationFn: addData
    });

    return result;
}

export const useUploadImageFilesToS3 = () => {
    
    const uploadFile = async({imgfiles,tempurls})=>{

        console.log('uploading files to s3...')
        console.log("imgFiles :::: ", imgfiles);
        console.log("tempUrls :::: ", tempurls);
        try {
            const uploadImgPromises = imgfiles.map((img, index) => {
                const url = tempurls.find( w => w.name === img.name).imageUrl;
console.log("url :::: ", url);
                if(!url) return null;

                return fetch(url, {
                    method: 'PUT',
                    body: img,
                    headers: {
                        'Content-Type': img.type,
                        'Accept': 'application/json'
                    },
                })
            });

            const uploadImgResponses = await Promise.all(uploadImgPromises);

            
            console.log("uploadImgResponses :::: ", uploadImgResponses);

            const successfulUploads = uploadImgResponses.filter((response) => response && response.ok);
            console.log("successfulUploads :::: ", successfulUploads);
            const failedUploads = uploadImgResponses.filter((response) => response && !response.ok);
            console.log("failedUploads :::: ", failedUploads);

        } catch (error) {
            console.error('Error uploading file:', error)
        }
    }

    const result = useMutation({
        mutationFn:  uploadFile
    });

    return result;
}

export const globalFetch = async (url, method, header={},body={}) => {


        const resp = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                ...header
            },
        });

        if(!resp.ok)
        {
             const errorbody = resp.statusText;
            console.log('error body from api call backend ::  ', errorbody);
            switch(resp.status) {

                case 401:
                    throw new AuthRequiredError(errorbody);
                case 500:
                    throw new ServerError(errorbody);
                default:
                    //  console.log("Error in response", resp.statusText);
                    // if(resp.status === 401 ) handleUnauthorized();
            
                    const error = new Error(errorbody || 'Something went wrong');
                    error.status = resp.status;
                    error.body = errorbody;
                    throw error;

            }
           
        }

        const data = await resp.json();
        console.log('data from api call backend ::  ', data);
        return data;
    
}

export const useAuthGuard = () => {
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
        console.log('in auth guard')
      const token = localStorage.getItem('token');
      if (!token && location.pathname !== '/login') {
        navigate('/login'); // Redirect to login if no token is found
      }
    }, [location, navigate]);
  };


export const useGetImages = () => {

    // const {handleUnauthorized} = useAuthContext();

    const fetchdata = async()=>{

        
            
            const resp = await globalFetch(`${baseUrl}/images`,'POST',{},{});
    
            console.log('resp from get current user :::: ', resp);
        
            return resp;

   
}

const result = useQuery({
    queryKey: ['images'],
    queryFn: fetchdata,
    retry: 0,
});

return result;
}

export const useDeleteImages = () =>{
    const {handleUnauthorized} = useAuthContext();

    const deleteImage = async (imgNames) => {
        try {
            console.log('delete body ',imgNames);
            const resp = await globalFetch(`${baseUrl}/images/delete`,'POST',{}, {Req: {
                Description : "test",
                imageUrls : imgNames
            }},handleUnauthorized);
            console.log('resp from delete image :::: ', resp);
            return resp.isSuccess;
        } catch (error) {
            console.error('Error deleting image:', error)
            return null;
        }
    }

    const result = useMutation({
        mutationFn: deleteImage
    });

    return result;
}

export const useGetTmpUrlDownloadImage = () => {

    const getTmpUrl = async (imgName) => {
        try {
            const resp = await globalFetch(`${baseUrl}/gettempurldownload`,'POST',{}, {Req: {
                Description : "test",
                imageUrls : imgName
            }});
            console.log('resp from get tmp url :::: ', resp);
            return resp;
        } catch (error) {
            console.error('Error fetching data:', error)
            return null;
        }
    }

    const result = useMutation({
        mutationFn: getTmpUrl
    });

    return result
};