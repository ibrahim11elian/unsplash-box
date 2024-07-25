const variationType = {
  primary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 border",
  danger: "bg-red-600 text-gray-100 hover:bg-red-500",
};

function Button({ children, className, variation = "primary", ...props }) {
  return (
    <button
      className={`${className} ${variationType[variation]} flex items-center gap-2 rounded px-4 py-2 text-xs transition-colors duration-300 disabled:cursor-not-allowed sm:text-base`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
