// import  { useCallback, useState } from 'react'
// import { FileWithPath, useDropzone } from 'react-dropzone'
// import { Button } from '../ui/button'

// type FileUpLoaderProps = {
//   fieldChange: (FILES: File[]) => void;
//   mediaUrl: string;
// }

// const FileUpLoader = ({fieldChange, mediaUrl}: FileUpLoaderProps) => {
//   const [file, setFile] = useState<File[]>([]);
//   const [fileUrl, setFileUrl] = useState('');

//   const onDrop = useCallback(
//     (acceptedFiles: FileWithPath[]) => {
//       setFile(acceptedFiles)
//       fieldChange(acceptedFiles)
//       setFileUrl(URL.createObjectURL(acceptedFiles[0]))
//     // Do something with the files
//   }, [fieldChange])


//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       'image/*': ['.png', '.jpg', '.jpeg','.svg'],
//     }
//   });
//   return (
//     <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
//       <input {...getInputProps()} className='cursor-pointer'/>
//       {
//         fileUrl ? (
//           <>
//           <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
//             <img src={fileUrl} 
//             alt='image preview' 
//             className='file_uploader-img' />
//           </div>
//           <p className='file_uploader-label'>Click or drag photo to replace</p>
//           </>
//         ): (
//           <div className='file_uploader-box'>
//               <img src='/assets/icons/file-upload.svg'
//                 alt='file-upload'
//                 width={96}
//                 height={77} />
//               <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
//               <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
//               <Button type="button" className='shad-button_dark_4'>Browse</Button>
//           </div>
//         )
//       }
//     </div>
//   )
// }

// export default FileUpLoader

import { ChangeEvent, useState } from 'react';
import { Button } from '../ui/button'
import axios from 'axios';
import { useToast } from '../ui/use-toast';

interface FileUpLoaderProps {
  handleFile: (file: File) => void;
}

const FileUpLoader : React.FC<FileUpLoaderProps> = ({ handleFile }) => {
  const [file, setFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const { toast } = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      handleFile(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      axios.post('http://localhost:3000/api/upload', formData)
        .then(response => {
          console.log('Upload successful:', response.data);
          // Handle successful upload response if needed
        })
        .catch(error => {
          toast({
            title: 'Upload failed',
          });
          console.error('Upload failed:', error);
        });
    }
  };
  
  return (
    <div className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
          <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
          <input 
             type='file' 
             onChange={handleChange} 
             className="hidden"
             accept="image/*"
             id="fileInput"/>
             {previewUrl && <img src={previewUrl} alt="Preview" />}
          </div>
          <p className='file_uploader-label'>Click or drag photo to replace</p>
          <div className='file_uploader-box'>
              <img src='/assets/icons/file-upload.svg'
                alt='file-upload'
                width={96}
                height={77} />
              <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
              <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
              <Button type='button' onClick={(handleUpload) => document.getElementById('fileInput')?.click()}
              className='shad-button_dark_4'>Browse</Button>
          </div>
    </div>
  )
}

export default FileUpLoader