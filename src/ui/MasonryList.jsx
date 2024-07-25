import Masonry from "react-masonry-css";

const MasonryGallery = ({ children }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="-ml-5 flex w-auto"
      columnClassName="pl-5"
    >
      {children}
    </Masonry>
  );
};

export default MasonryGallery;
