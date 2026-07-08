import React from 'react'

const Messege = ({ message, handlemessegeclick }: { message: string, handlemessegeclick: (message: string) => void }) => {
  return (
    <button
      className="text-left w-full bg-[#101415]/60 border border-white/5 hover:border-[#4edea3]/50 hover:bg-[#4edea3]/5 rounded-lg p-4 font-['Plus_Jakarta_Sans'] text-[16px] leading-[24px] font-normal text-gray-400 hover:text-white transition-all duration-300 flex items-start gap-3 group"
      onClick={() => handlemessegeclick(message)}
      type="button"
    >
      <span className="material-symbols-outlined text-[#4edea3]/50 group-hover:text-[#4edea3] mt-0.5 text-[20px]">
        chat_bubble
      </span>
      <span>{message}</span>
    </button>
  )
}

export default Messege
