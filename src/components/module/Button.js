"use client"

function Button(props) {
  return (
    <button {...props} className="bg-purple-300 px-2 py-2 rounded-lg flex justify-center gap-1 items-center">
      {props.children}
    </button>
  )
}

export default Button
