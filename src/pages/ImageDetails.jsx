import ImageDetails from "../features/imageDetails/ImageDetails";

function Image() {
  return (
    <section className="grid grid-cols-2 grid-rows-[auto_1fr] gap-x-10 gap-y-5 bg-gray-50 px-3 py-10 sm:px-16 md:px-44 lg:px-20">
      <ImageDetails />
    </section>
  );
}

export default Image;
