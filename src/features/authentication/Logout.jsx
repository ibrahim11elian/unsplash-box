import { HiArrowRightOnRectangle } from "react-icons/hi2";
import useLogout from "./useLogout";
import Spinner from "../../ui/Spinner";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <button
      className="rounded p-2 text-lg text-gray-800 hover:bg-gray-300"
      onClick={logout}
    >
      {!isLoading ? <HiArrowRightOnRectangle /> : <Spinner size="tiny" />}
    </button>
  );
}

export default Logout;
