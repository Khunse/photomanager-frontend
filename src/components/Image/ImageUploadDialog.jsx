
import React from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {  Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from '../ui/dialog'
import { Button } from '../ui/button'
import UploadImage from './UploadImage'

export default function ImageUploadDialog() {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Upload Images</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px]">
     <div className='mt-5'>
     <UploadImage />
     </div>
    </DialogContent>
  </Dialog>
  )
}
