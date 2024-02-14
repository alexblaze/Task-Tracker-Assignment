import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskPage from "../pages/TaskPage";
import Spinner from "../components/loader/Spinner";

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<TaskPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoute;
