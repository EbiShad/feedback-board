function TextField({ label, type, name, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block cursor-pointer text-purple-700 mb-1">
        {label}:
      </label>
      <input
        className="p-3 bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-purple-600 w-full "
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
