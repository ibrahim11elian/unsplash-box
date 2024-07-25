function GradientTitle({ children }) {
  return (
    <h1 className="inline-block bg-gradient-to-r from-[#F2C593] to-[#8A3282] bg-clip-text text-5xl font-semibold capitalize text-transparent">
      {children}
    </h1>
  );
}

export default GradientTitle;
