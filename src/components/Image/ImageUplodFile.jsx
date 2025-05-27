import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import React from 'react'
import { Badge } from '../ui/badge'

export default function ImageUploadFile({imgUrl, imgName, imgSize, handleRemoveFile}) {
  return (
    <div className='flex items-center gap-2'>
        <AspectRatio ratio={10 / 3} className="w-full h-full self-center">
            <img src={imgUrl} alt={imgName} className='h-full w-full rounded-md object-cover'/>
        </AspectRatio>

        <p>{imgName}</p>

        <p>{(imgSize/1000).toFixed(2)} KB</p>

        <div>
            <Badge variant={"outline"} className="cursor-pointer hover:bg-gray-200" onClick={()=> handleRemoveFile(imgName)}>
                {/* <span className='text-sm'>Remove</span> */}
            <RemoveIcon/>
            </Badge>
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
