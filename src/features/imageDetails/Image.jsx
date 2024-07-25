function Image({ url, alt }) {
  return (
    <div className="col-span-full row-span-full h-full lg:col-span-1">
      <img src={url} alt={alt} className="h-full rounded" />
    </div>
  );
}

export default Image;
