import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/card'
import { Button } from './components/ui/button'
import ImageUploadFile from './ImageUplodFile'
import { toast } from 'sonner'
import { useAuthGuard, useGetImages, useGetTempUploadUrl, useUploadImageFilesToS3 } from './External/Api'

export default function UploadImage() {
useAuthGuard();
    const inputFileref = React.useRef(null)
const allowfiletypes = ['image/jpeg', 'image/jpg', 'image/png']
const [uploadFiles, setUploadFiles] = React.useState([])

const {mutateAsync: getTempUrl,data: tempUploadUrls} = useGetTempUploadUrl()
const {mutateAsync: imageUploadS3} = useUploadImageFilesToS3();
const {refetch:getImagerefetch} = useGetImages();
    const handleChange = async (e) => {
        
        e.preventDefault();

        console.log('adding images...')

        try {
            console.log("e.target.files :::: ", e.target.files);
            if (e.target.files && e.target.files[0]) {
                // at least one file has been selected
      
                // validate file type
                const valid = allowfiletypes.includes(e.target.files[0].type)
                
                if (!valid) {
                //   toast({
                //     title: 'Invalid file type',
                //     description: 'Please upload a valid file type.',
                //   })

                  console.log("invalid file type");

                  return
                }
      
                // const { getUrl, error } = await s3Upload(e.target.files[0])
                // if (!getUrl || error) throw new Error('Error uploading file')
      
                const { name, size } = e.target.files[0]
      
                // addFilesToState([{ name, getUrl, size }])

            }
            var files = Array.from(e.target.files);
          setUploadFiles(files);

        } catch (error) {
            console.log('Error uploading file:', error)
        }
    }
    
    const handleFileClick = (e) => {
        e.preventDefault();

        inputFileref.current.click();
    }

    const handleRemoveFile = (file) => {
        // e.preventDefault();
console.log("removing file", file);
        const newFiles = uploadFiles.filter((item) => item.name !== file)
        console.log(" new file list", newFiles);
        setUploadFiles(newFiles)
    }

    const handleUploadFiles = async () => {
      console.log("uploading files to server", uploadFiles);
        const resp = await getTempUrl(uploadFiles.map((file) => {
         return { 
          name: file.name,
          imgType: file.type,
         }
        }));
        
        console.log("temp upload urls", resp);
        await imageUploadS3({imgfiles: uploadFiles, tempurls: resp});
        getImagerefetch();
    };

    console.log("file urel",uploadFiles.length > 0 && URL.createObjectURL(uploadFiles[0]));
    return (
        <Card>
          <CardHeader>
            <CardTitle>Upload Images</CardTitle>
            <CardDescription>Drag and drop your images or click the button below to select files.</CardDescription>
          </CardHeader>
          {
            uploadFiles.length > 0 ? 
            <>
          <CardContent className="overflow-y-auto max-h-[400px]">
            <div className='w-full flex flex-col gap-5'>
            {
           uploadFiles.map((file, index) => {
            return (
                <ImageUploadFile key={file.name} imgName={file.name} imgUrl={URL.createObjectURL(file)} imgSize={file.size} handleRemoveFile={handleRemoveFile}/>
            )
          }
          )
        }
        </div>
              </CardContent>
              <CardFooter>
                <div className='w-full flex items-center justify-between'>
                <Button variant="outline" onClick={() => setUploadFiles([])}>Remove All</Button>
                <Button variant="outline" onClick={()=>{
                  handleUploadFiles();
                  toast("upload event!",{
                    description: "uploading files to server...",
                    duration: 3000,
                  })
                }}>Upload</Button>
                </div>
              </CardFooter>
              </>
            :
            <>
          <CardContent className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg p-10 space-y-6">
            <CloudUploadIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />

            <input
                //   {...props}
                  ref={inputFileref}
                  multiple
                  onChange={handleChange}
                  accept="image/jpeg, image/jpg, image/png"
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />

            <Button onClick={handleFileClick} variant="outline">Select Files</Button>
          </CardContent>
          </>
}
        </Card>
      )


}

function CloudUploadIcon(props) {
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
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m16 16-4-4-4 4" />
      </svg>
    )
  }
