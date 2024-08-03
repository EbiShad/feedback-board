function TextField({ label, type, name, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block cursor-pointer text-purple-700 mb-1">
        {label}:
      </label>
      <input
        className="textFeild__input" 
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextField;
