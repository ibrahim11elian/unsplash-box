import CollectionsList from "../features/collections/CollectionList";
import GradientTitle from "../ui/GradientTitle";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CreateCollectionForm from "../features/collections/CreateCollectionForm";
import useTitle from "../hooks/useTitle";
import { HiPlus } from "react-icons/hi2";

function Collections() {
  useTitle("Collections");
  return (
    <div className="bg-gray-50 px-10 pb-5 sm:px-20">
      <div className="my-10 flex flex-col items-center justify-center gap-3">
        <GradientTitle>Collections</GradientTitle>
        <p className="text-center font-light text-gray-900 sm:w-1/2 md:w-1/3">
          Explore the world through collections of beautiful photos free to use
          under the{" "}
          <a
            className="font-normal underline"
            href="https://unsplash.com/license"
          >
            Unsplash License.
          </a>
        </p>
      </div>
      <CollectionsList />

      <Modal>
        <Modal.Open opens={"createCollection"}>
          <Button className={"mt-5"}>
            <HiPlus size={"1.2rem"} /> Create Collection
          </Button>
        </Modal.Open>
        <Modal.Window name={"createCollection"}>
          <CreateCollectionForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Collections;
