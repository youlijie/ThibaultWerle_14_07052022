import React, { Suspense } from "react"; //https://fr.reactjs.org/docs/code-splitting.html
import { Route, Routes } from "react-router-dom";
import CreateEmployee from "./pages/CreateEmployee";
const EmployeesList = React.lazy(() => import("./pages/EmployeesList"));

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route
          path="/employee-list"
          element={
            <Suspense fallback={<div>Chargement...</div>}>
              <EmployeesList />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
