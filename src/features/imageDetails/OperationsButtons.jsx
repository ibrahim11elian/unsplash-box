import Button from "../../ui/Button";

import Modal from "../../ui/Modal";
import useDownloadImage from "./useDownloadImage";
import AddToCollection from "../collections/AddToCollections";
import SearchCollectionsProvider from "../../context/SearchCollection";
import { useUser } from "../authentication/useUser";
import { HiOutlineArrowDownCircle, HiPlus } from "react-icons/hi2";

function OperationsButtons({ url, id }) {
  const { currentUser } = useUser();
  const { downloadImage, downloadProgress, isDownloading } = useDownloadImage();
  return (
    <SearchCollectionsProvider>
      <div className="flex gap-3">
        <Modal>
          {currentUser && (
            <Modal.Open opens={"addToCollections"}>
              <Button>
                <HiPlus size={"1.2rem"} />
                <span>Add to Collection</span>
              </Button>
            </Modal.Open>
          )}

          <Modal.Window name={"addToCollections"}>
            <AddToCollection />
          </Modal.Window>
        </Modal>

        <Button
          onClick={() =>
            downloadImage({
              url,
              name: `${id}.jpg`,
            })
          }
        >
          <HiOutlineArrowDownCircle size={"1.2rem"} />
          <span>{isDownloading ? "downloading" : "Download"}</span>
          {isDownloading && <span>{downloadProgress}%</span>}
        </Button>
      </div>
    </SearchCollectionsProvider>
  );
}

export default OperationsButtons;
