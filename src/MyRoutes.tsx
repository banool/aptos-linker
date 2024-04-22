import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import { GoPage } from "./pages/GoPage";

export default function MyRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <GoPage />
          </MainLayout>
        }
      />
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFoundPage />
          </MainLayout>
        }
      />
    </Routes>
  );
}
