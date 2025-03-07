import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/dashboard/dashboard.component";
import FormList from "./Components/form-list/form-list.component";
import FormEdit from "./Components/form-edit/form-edit.component";
import FormInputList from "./Components/form-input-list/form-input-list.component";
import FormInputEdit from "./Components/form-input-edit/form-input-edit.component";
import Register from "./Components/registros/register-list.component";
import Registercreate from "./Components/registros-nuevo/register-create.component";
import Registerlist from "./Components/registros-list/register-list.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard></Dashboard>}></Route>
        <Route path="/formularios" element={<FormList></FormList>}></Route>
        <Route
          path="/formularios/Edit/:id"
          element={<FormEdit></FormEdit>}
        ></Route>
        <Route
          path="/formularios/Create"
          element={<FormEdit></FormEdit>}
        ></Route>
        <Route
          path="/formulario/:id/Campos"
          element={<FormInputList></FormInputList>}
        ></Route>
        <Route
          path="/formulario/:formularioID/campo/Create"
          element={<FormInputEdit></FormInputEdit>}
        ></Route>
        <Route
          path="/formulario/campo/Edit/:id"
          element={<FormInputEdit></FormInputEdit>}
        ></Route>
        <Route path="/registros" element={<Register></Register>}></Route>
        <Route
          path="/registros/create"
          element={<Registercreate></Registercreate>}
        ></Route>
        <Route
          path="/registros/formularios/:id"
          element={<Registerlist></Registerlist>}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
