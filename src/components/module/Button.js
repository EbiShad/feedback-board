"use client"

function Button(props){
  return (
    <button {...props} disabled={props.disabled} 
    className={`px-2 py-2 rounded-lg flex justify-center text-black gap-1 items-center transition-colors duration-300 
     ${props.gray ? "bg-gray-300 hover:bg-gray-400":"bg-purple-300 hover:bg-purple-400"}
     ${props.smallBtn && "text-[10px] py-[2px]"}
     ${props.mediumBtn && "text-[14px] py-1"}
     ${props.disabled ? "bg-opacity-30 text-opacity-50 cursor-not-allowed pointer-events-none" : ""}`}>
      {props.children}
    </button>
  )
}

export default Button
