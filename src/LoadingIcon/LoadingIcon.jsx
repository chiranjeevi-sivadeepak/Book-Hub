import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

function LoadingIcon() {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <ClipLoader size={60} color="blue" />
    </div>
  )
}

export default LoadingIcon
