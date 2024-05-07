import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'
import instance from '../../lib/axiosConfig'

type FileUpLoaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
}

const FileUpLoader = ({fieldChange, mediaUrl}: FileUpLoaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles)
      fieldChange(acceptedFiles)
      handleUpload(acceptedFiles[0])
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg','.svg'],
    }
  });

  
  // Implement HandleUpload from AuthContext.tsx to upload images and access logged in user token
  async function handleUpload(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await instance.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
      console.log('Upload successful', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  return (
    <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
      <input {...getInputProps()} 
              id="fileInput" 
              type="file"
              formEncType='multipart/form-data'
              className='cursor-pointer' />
      {
        fileUrl ? (
          <>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
            <img src={fileUrl} 
            alt='image preview' 
            className='file_uploader-img' />
          </div>
          <p className='file_uploader-label'>Click or drag photo to replace</p>
          </>
        ): (
          <div className='file_uploader-box'>
              <img src='/assets/icons/file-upload.svg'
                alt='file-upload'
                width={96}
                height={77} />
              <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
              <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
              <Button type='button' onClick={() => handleUpload}
              className='shad-button_dark_4'>Browse Files</Button>
          </div>
        )
      }
    </div>
  )
}

export default FileUpLoader