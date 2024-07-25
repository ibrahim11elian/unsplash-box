import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <main className="flex h-screen items-center justify-center bg-gray-50 p-12">
      <div className="flex-0 max-w-[96rem] flex-grow rounded-md border border-gray-200 bg-white p-12 text-center">
        <h1 className="mb-8 text-3xl font-bold text-gray-600">
          The page you are looking for could not be found 😢
        </h1>
        <Button className={"m-auto"} onClick={() => navigate(-1)}>
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
