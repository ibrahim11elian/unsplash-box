function HomeHero() {
  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat lg:bg-[url('/hero-image.png')]">
      <div className="absolute left-[-65%] top-0 block h-full w-full bg-[url('/hero-left.png')] bg-contain bg-left bg-no-repeat sm:left-[-45%] md:left-[-35%] lg:hidden"></div>
      <div className="absolute right-[-65%] top-0 block h-full w-full bg-[url('/hero-right.png')] bg-contain bg-right bg-no-repeat sm:right-[-45%] md:right-[-35%] lg:hidden"></div>
    </div>
  );
}

export default HomeHero;
