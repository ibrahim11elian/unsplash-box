function CollectionSmallCard({ collection, children }) {
  const numPhotos = collection.images.length || 0;
  return (
    <li>
      <div className="group flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors duration-300 hover:bg-gray-200">
        <div className="flex items-center gap-3">
          {numPhotos ? (
            <img
              src={collection.images[0].url}
              alt="alt"
              className="h-20 w-20 rounded object-cover"
            />
          ) : null}

          <div>
            <p className="text-sm font-medium capitalize text-gray-900">
              {collection.name}
            </p>
            <p className="text-sm text-gray-700">
              {numPhotos} {numPhotos > 0 ? "photos" : "photo"}
            </p>
          </div>
        </div>

        {children}
      </div>
    </li>
  );
}

export default CollectionSmallCard;
