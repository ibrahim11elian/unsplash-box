import { Link } from "react-router-dom";
import Menus from "../../ui/Menus";
import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import CreateEditCollectionForm from "./CreateCollectionForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteCollection from "./useDeleteCollection";

const getGridClass = (length) => {
  switch (length) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    default:
      return "grid-cols-4 grid-rows-2";
  }
};

function imageClass(length, index) {
  if (length >= 3) {
    if (index === 0) return "rounded-tl-md rounded-bl col-span-3 row-span-full";
    if (index === 1) return "rounded-tr-md row-span-1";
    else return "rounded-br-md row-span-1";
  }
  return "";
}

const CollectionCard = ({ collection }) => {
  const { deleteCollection, isDeleting } = useDeleteCollection();
  const { name, images, id, imageCount } = collection;

  return (
    <li>
      {/* Card Image */}
      <Link to={`/collections/${id}`}>
        <div
          className={`${!imageCount ? "hidden" : ""} grid h-[15rem] gap-[0.1rem] xl:h-[20rem] ${getGridClass(images.length)} overflow-hidden rounded-md`}
        >
          {images.length &&
            images
              .slice(0, 3)
              .map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${name} ${index + 1}`}
                  className={` ${imageClass(images.length, index)} h-full w-full object-cover`}
                />
              ))}
        </div>
      </Link>

      {/* Card Details */}
      <div className="pt-4">
        <div className="flex items-center justify-between">
          <Link to={`/collections/${id}`}>
            <h3 className="text-lg font-medium capitalize text-gray-900">
              {name}
            </h3>
          </Link>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Modal.Open opens={"changeName"}>
                  <Menus.Button icon={<HiPencil />}>
                    Change collection name
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens={"delete"}>
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name={"changeName"}>
                <CreateEditCollectionForm collectionToEdit={{ name, id }} />
              </Modal.Window>

              <Modal.Window name={"delete"}>
                <ConfirmDelete
                  resourceName={"collection"}
                  disabled={isDeleting}
                  onConfirm={() => deleteCollection(id)}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
        <p className="text-sm text-gray-400">{imageCount} photos</p>
      </div>
    </li>
  );
};

export default CollectionCard;
