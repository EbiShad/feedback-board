import useOutSideClick from "@/Hooks/useOutsideClick";
import { CgClose } from "react-icons/cg";

function Modal({ isOpen, children, onClose, title }) {
  const ref = useOutSideClick(onClose);

  return (
    isOpen && (
      <div className="backdrop-blur-md fixed top-0 left-0 bg-slate-900 bg-opacity-60 w-full min-h-screen z-50  duration-1000 transition-opacity overflow-y-auto">
        <div
          ref={ref}
          className="w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg p-4 bg-slate-100 transition-all duration-1000"
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

export default Modal
