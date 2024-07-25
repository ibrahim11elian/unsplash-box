function ButtonWithIcon({ icon, children, ...props }) {
  return (
    <button
      className="hidden items-center gap-2 bg-inherit px-4 py-2 text-gray-900 transition-all duration-300 hover:text-gray-700 disabled:cursor-not-allowed group-hover:flex"
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

export default ButtonWithIcon;
