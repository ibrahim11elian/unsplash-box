import { Outlet } from "react-router-dom";
import Header from "./Header";
function AppLayout() {
  return (
    <>
      <Header />
      <main className="h-[calc(100dvh)] bg-white pt-[3.9rem]">
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
