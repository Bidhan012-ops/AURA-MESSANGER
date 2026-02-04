import React from 'react'

const Messege = ({message,handlemessegeclick}:{message:string,handlemessegeclick:(message:string)=>void}) => {
  return (
    <div className="flex justify-start cursor-pointer hover:translate-2 transition-all delay-100" onClick={()=>handlemessegeclick(message)}>
              <div className="bg-secondary text-secondary-foreground px-6 py-3 rounded-2xl rounded-tl-none border font-medium max-w-[80%]">
                {message}
              </div>
               </div>
  )
}

export default Messege
