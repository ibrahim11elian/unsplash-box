function UserInfo({ image, name }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-14 w-14">
        <img
          src={image}
          alt={`${name} photo`}
          className="rounded-full object-cover"
        />
      </div>
      <p className="font-semibold text-gray-700">{name}</p>
    </div>
  );
}

export default UserInfo;
