import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import React from 'react'
import { Checkbox } from '../ui/checkbox'

export default function ImageItem({imgUrl,imgName,date,meta,isSelected,handleSelectImage}) {

 
  return (
    <div className='w-full h-full relative group' onClick={() => handleSelectImage(imgName)}>
      <Checkbox  checked={isSelected} className={`absolute z-10 bg-white rounded right-2 top-2 ${ !isSelected && 'hidden group-hover:block'}`}/>
        <AspectRatio ratio={4 / 3} className="w-full">
            <img src={imgUrl} alt={imgName} className="object-cover w-full h-full rounded-md" />
        </AspectRatio>
    </div>
  )
}
