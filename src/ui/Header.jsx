import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="fixed right-0 top-0 z-50 flex w-full items-center justify-between border-b bg-white px-2 py-3 sm:px-6 sm:py-4">
      <Logo />
      <Navigation />
    </header>
  );
}

export default Header;
