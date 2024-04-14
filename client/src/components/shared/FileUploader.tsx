// import { ChangeEvent, useState } from 'react';
// import { Button } from '../ui/button'
// import axios from 'axios';
// import { useToast } from '../ui/use-toast';

// interface FileUpLoaderProps {
//   handleFile: (file: File) => void;
//   handleUpload?: () => void;
// }

// const FileUpLoader : React.FC<FileUpLoaderProps> = ({ handleFile }) => {
//   const [file, setFile] = useState<File | undefined>();
//   const [previewUrl, setPreviewUrl] = useState<string | undefined>();
//   const { toast } = useToast();

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setPreviewUrl(reader.result as string);
//       };
//       reader.readAsDataURL(selectedFile);
//       handleFile(e.target.files[0]);
//     }
//   };
//    const handleUpload = () => {
//     if (file) {
//       const formData = new FormData();
//       formData.append('image', file);
//       axios.post('http://localhost:3000/api/upload', formData)
//         .then(response => {
//           console.log('Upload successful:', response.data);
//           // Handle successful upload response if needed
//         })
//         .catch(error => {
//           toast({
//             title: 'Upload failed',
//           });
//           console.error('Upload failed:', error);
//         });
//     }
//   };
  
//   return (
//     <div className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer'>
//           <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
//           <input 
//              type='file' 
//              onChange={handleChange} 
//              className="hidden"
//              accept="image/*"
//              id="fileInput"/>
//              {previewUrl && <img src={previewUrl} alt="Preview" />}
//           </div>
//           <p className='file_uploader-label'>Click or drag photo to replace</p>
//           <div className='file_uploader-box'>
//               <img src='/assets/icons/file-upload.svg'
//                 alt='file-upload'
//                 width={96}
//                 height={77} />
//               <h3 className='base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
//               <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
//               <Button type='button' onClick={() => document.getElementById('fileInput')?.click()}
//               className='shad-button_dark_4'>Browse</Button>
//           </div>
//     </div>
//   )
// }

// export default  FileUpLoader;

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
          const imageURL = response.data.imageURL;
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
             id="fileInput"
             />
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
              <Button type='button' onClick={() => document.getElementById('fileInput')?.click()}
              className='shad-button_dark_4' >Browse</Button>
          </div>
    </div>
  )
}

export default  FileUpLoader;