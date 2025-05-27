import React, { useEffect, useState } from 'react'
import { useAuthGuard, useDeleteImages, useGetImages, useGetTmpUrlDownloadImage } from '../common/External/Api';
import { Button } from '../components/ui/button';
import { downloadImageS3 } from '../common/filemanagement';
import {ImageItem,ImageUploadDialog,} from 'components/Image';
import { toast } from 'sonner'
import { useNavigate, useNavigation } from 'react-router';


export default function HomePage() {
// useAuthGuard();
const {data: imageDataList,refetch: getImageRefetch,error,isError} = useGetImages();
const [selectedImage, setSelectedImage] = useState([]);
const {mutateAsync: deleteImages} = useDeleteImages();
const {mutateAsync: getTmpUrlImg} = useGetTmpUrlDownloadImage();
const navigate = useNavigate();

 useEffect(()=>{

      if(isError) 
      {

            if(error.statusCode === 401) navigate('/login');

            toast.error(error.name, {
              duration: 5000,
              description: error.message,
            });
            
        }    
    },[error, navigate]);

console.log('image data list ::: ', imageDataList);
console.log('is serror ::: ', error);
// Uncomment the below code to use a static image data list for testing
    // const imageDataList = [
    //     {
    //       imgUrl: 'https://picsum.photos/400/300',
    //       imgName: 'Beautiful Landscape',
    //       date: '2025-04-06',
    //       meta: {
    //         width: 400,
    //         height: 300,
    //       },
    //     },
    //     {
    //       imgUrl: 'https://picsum.photos/500/400',
    //       imgName: 'Mountain View',
    //       date: '2025-04-05',
    //       meta: {
    //         width: 500,
    //         height: 400,
    //       },
    //     },
    //     {
    //       imgUrl: 'https://picsum.photos/600/400',
    //       imgName: 'Ocean Sunset',
    //       date: '2025-04-04',
    //       meta: {
    //         width: 600,
    //         height: 400,
    //       },
    //     },
    //     {
    //       imgUrl: 'https://picsum.photos/300/300',
    //       imgName: 'City Skyline',
    //       date: '2025-04-03',
    //       meta: {
    //         width: 300,
    //         height: 300,
    //       },
    //     },
    //     {
    //       imgUrl: 'https://picsum.photos/450/350',
    //       imgName: 'Forest Path',
    //       date: '2025-04-02',
    //       meta: {
    //         width: 450,
    //         height: 350,
    //       },
    //     },
    //   ];

    const handleSelectImageP = (imgName) => {
      console.log('image sleecte p ',imgName)
      console.log('selected image p ',selectedImage)  
        if(selectedImage.includes(imgName)){
            setSelectedImage(prev => prev.filter(item => item !== imgName))
        }else{
            setSelectedImage(prev => [...prev, imgName])
        }
    };

    const handleDeleteImage = async () => {
      console.log('delete image', selectedImage);
      const resp = await deleteImages(selectedImage.map((item) => ( {name:item} )));
      setSelectedImage([]);
      console.log('delete image resp', resp);
      getImageRefetch();
    }

    const handleDownloadImage = async ()=>{
      const resp = await getTmpUrlImg(selectedImage);
      setSelectedImage([]);
      console.log('download image resp', resp);
      if(resp && resp.length > 0){
        resp.forEach(async (item) => {
       await downloadImageS3({imgName: item.name, imgUrl: item.imageUrl});
        })
      }

      console.log("image downloaded successfully");

    };



  return (
    <div className=''>
 
        <ImageUploadDialog />
        {
        selectedImage.length > 0 &&
        <>
        <Button onClick={handleDeleteImage}>
          <RemoveIcon/>
        </Button>
         <Button onClick={handleDownloadImage}>
         <DownloadIcon/>
       </Button>
       </>
        }
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                {
                imageDataList &&  imageDataList.map((item, index) => (
                            <ImageItem key={index} imgUrl={item.imageUrl} imgName={item.name} date={'2025-01-02'} meta={{width: 400,height: 300}} handleSelectImage={handleSelectImageP} isSelected={selectedImage.includes(item.name)}/>
                    ))
                }
        </div>
    </div>
  )
}



function RemoveIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    </svg>
  );
}


function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
