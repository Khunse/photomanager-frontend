
import React from 'react'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import {  Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, } from './components/ui/dialog'
import { Button } from './components/ui/button'
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
