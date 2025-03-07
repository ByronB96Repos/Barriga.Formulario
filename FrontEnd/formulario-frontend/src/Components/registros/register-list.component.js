import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:5218/api/Formularios";
function Registerlistcomponent() {
  const [lstFormularios, SetFormularios] = useState([]);
  const navegacion = useNavigate();

  useEffect(() => {
    GetFormularios();
  }, []);

  const GetFormularios = async () => {
    const response = await axios.get(url);
    SetFormularios(response.data);
  };

  const handleInputs = (id) => {
    navegacion(`/registros/formularios/${id}`);
  };

  const handleCreate = () => {
    navegacion("/registros/create");
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="bg-primary text-white text-center py-2">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            {/* Botón de volver */}
            <a className="btn btn-outline-light" href="/">
              <i className="bi bi-arrow-left"></i> Volver
            </a>
            {/* Título */}
            <h1 className="m-0">Registros</h1>
            {/* Botón de crear nuevo registro */}
            <button className="btn btn-success" onClick={handleCreate}>
              <i className="bi bi-plus-lg"></i> Crear nuevo
            </button>
          </div>
          <p className="mt-3">Seleccione un Formulario</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-4 flex-grow-1">
        <div className="row justify-content-center">
          {lstFormularios.map((formulario, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body text-center">
                  <button
                    className="btn btn-lg btn-secondary w-100 py-3 mb-2"
                    onClick={() => handleInputs(formulario.formularioID)}
                  >
                    {formulario.formularioNombre}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; 2025 Evaluacion. Byron Barriga</p>
      </footer>
    </div>
  );
}
export default Registerlistcomponent;
