import { useDarkMode } from "../context/DarkMode";

function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="w-36">
      <img
        className="w-full"
        src={isDarkMode ? "/logo-light.svg" : "/logo.svg"}
        alt="Unsplash Collection"
      />
    </div>
  );
}

export default Logo;
