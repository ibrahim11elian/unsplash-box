import { Link } from "react-router-dom";

function ImageGallery({ id, url, alt }) {
  return (
    <Link to={`/images/${id}`} className="mb-5 block w-full">
      <img src={url} alt={alt} className="w-full rounded" loading="lazy" />
    </Link>
  );
}

export default ImageGallery;
