import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import Collections from "./pages/Collections";
import Search from "./pages/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ImageDetails from "./pages/ImageDetails";
import { Toaster } from "react-hot-toast";
import Collection from "./pages/Collection";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./ui/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import { useDarkMode } from "./context/DarkMode";

function App() {
  const queryClient = new QueryClient();
  const { isDarkMode } = useDarkMode();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <BrowserRouter>
        <Routes>
          {/* Unprotected Routes */}
          <Route index element={<Navigate to={"/home"} replace />} />
          <Route element={<AppLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="images/:id" element={<ImageDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="collections" element={<Collections />} />
            <Route path="collections/:id" element={<Collection />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            backgroundColor: isDarkMode ? "#18212f" : "#fff",
            color: isDarkMode ? "#f3f4f6" : "#1f2937",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
