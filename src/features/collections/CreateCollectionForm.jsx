import { useState } from "react";
import Button from "../../ui/Button";
import useCreateCollection from "./useCreateCollection";
import useUpdateCollection from "./useUpdateCollection";
import { useUser } from "../authentication/useUser";

function CreateEditCollectionForm({ onCloseModal, collectionToEdit = {} }) {
  const { name: collectionName, id: collectionId } = collectionToEdit;
  const isEdit = Boolean(collectionId);

  const {
    currentUser: { uid },
  } = useUser();

  const { createCollection, isCreating } = useCreateCollection();
  const { updateCollection, isUpdating } = useUpdateCollection();

  const [name, setName] = useState(collectionName || "");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      setError("Collection name is required");
      return;
    }

    if (isEdit) {
      updateCollection(
        { id: collectionId, newName: name },
        { onSettled: () => onCloseModal?.() },
      );
    } else {
      createCollection(
        { userId: uid, collectionName: name },
        { onSettled: () => onCloseModal?.() },
      );
    }
  }
  return (
    <>
      <h3 className="mb-2 text-xl font-medium text-gray-900">
        Create Collection
      </h3>

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-2 sm:w-[20rem] md:w-[30rem]"
      >
        <div>
          <label htmlFor="name" hidden aria-hidden>
            collection name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            disabled={isCreating || isUpdating}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-800 ring-gray-300 focus:outline-none focus:ring-1"
            placeholder="Collection Name"
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <Button disabled={isCreating || isUpdating} type="submit">
          {isEdit ? "Update" : "Create"} collection
        </Button>
      </form>
    </>
  );
}

export default CreateEditCollectionForm;
