import { useEffect } from "react";
import { CgClose } from "react-icons/cg";

function Modal({ isOpen, children, onClose, title }) {


  useEffect(() => {
    if(isOpen){
      document.body.style.overflow = 'hidden';
    }
    return () => document.body.style.overflow = 'unset';
    }, [isOpen]);
    
  


  return (
    isOpen && (
      <div
        onClick={onClose}
        className={`${
          isOpen
            ? "visible bg-slate-900 bg-opacity-60 backdrop-blur-md"
            : "invisible"
        }  fixed top-0 left-0  w-full min-h-screen z-50 flex justify-center items-center duration-500 transition-all`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%]  max-h-[600px] overflow-y-auto ${
          isOpen ? "-translate-y-0 opacity-100" : "-translate-y-16 opacity-0"
        } rounded-lg shadow-lg p-4 bg-slate-100 duration-500 transition-all`}
      >
        <div className="flex items-center justify-between pb-2 mb-6 border-b-2">
          <h5 className="text-lg ">{title}</h5>
          <button onClick={onClose}>
            <CgClose />
          </button>
        </div>
        {children}
      </div>
    </div>
    )
    
  )
}

export default Modal;

// fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
