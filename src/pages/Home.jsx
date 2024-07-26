import Search from "../features/search/Search";
import HomeHero from "../ui/HomeHero";

function Home() {
  return (
    <div className="relative mt-3 flex h-[calc(100vh-5rem)] items-center justify-center">
      <HomeHero />

      <div className="relative z-10 flex -translate-y-10 flex-col items-center gap-4">
        <h2 className="text-4xl font-semibold text-gray-900">Search</h2>
        <p className="text-center text-gray-600">
          Search high-resolution images from Unsplash
        </p>

        <Search />
      </div>
    </div>
  );
}

export default Home;
