import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const url = "http://localhost:5218/api/Campos";

function Forminputeditcomponent() {
  const { id } = useParams();
  const { formularioID } = useParams();
  const [Nombre, SetNombre] = useState("");
  const [Tipo, SetTipo] = useState("");
  const [FormularioID, SetFormularioID] = useState(0);
  const [Formulario, SetFormulario] = useState("");
  const navegacion = useNavigate();

  useEffect(() => {
    if (id) {
      const campoId = parseInt(id, 10);
      const GetCampo = async () => {
        try {
          const response = await axios.get(`${url}/${campoId}`);
          SetNombre(response.data.campoNombre);
          SetTipo(response.data.campoTipo);
          SetFormularioID(response.data.formularioID);
          SetFormulario(response.data.formularioNombre);
          console.log(response.data);
        } catch (error) {
          console.error("Error al obtener el campo:", error);
        }
      };
      GetCampo();
    } else {
      GetFormulario();
    }
  }, [id, formularioID]);

  const GetFormulario = async () => {
    const FormularioID = parseInt(formularioID, 10);
    try {
      const response = await axios.get(
        `http://localhost:5218/api/Formularios/${FormularioID}`
      );
      SetFormulario(response.data.formularioNombre);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener el formulario:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await handleEdit();
    } else {
      await handleCreate();
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post(url, {
        campoNombre: Nombre,
        campoTipo: Tipo,
        formularioID: formularioID,
      });
      navegacion(`/formulario/${formularioID}/Campos`);
    } catch (error) {
      console.error("Error al crear el formulario:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${url}/${id}`, {
        campoID: id,
        campoNombre: Nombre,
        campoTipo: Tipo,
      });
      navegacion(`/formulario/${FormularioID}/Campos`);
    } catch (error) {
      console.error("Error al actualizar el formulario:", error);
    }
  };

  const handleVolver = () => {
    if (id) {
      navegacion(`/formulario/${FormularioID}/Campos`);
    } else {
      navegacion(`/formulario/${formularioID}/Campos`);
    }
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <header className="bg-primary text-white text-center py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-outline-light"
              onClick={() => handleVolver()}
            >
              <i className="bi bi-arrow-left"></i> Volver
            </button>
            <h1 className="m-0">{Formulario}</h1>
            <div style={{ width: "100px" }}></div>
          </div>
          <div>
            {id ? (
              <p className="mt-3">Editar Campo: {Nombre}</p>
            ) : (
              <p className="mt-3">Nuevo Campo</p>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-4 flex-grow-1">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formularioNombre" className="form-label">
              Nombre del Campo:
            </label>
            <input
              type="text"
              className="form-control"
              id="Nombre"
              value={Nombre}
              onChange={(e) => SetNombre(e.target.value)}
              required
            />
            <label htmlFor="formularioNombre" className="form-label">
              Tipo del Campo:
            </label>
            <input
              type="text"
              className="form-control"
              id="Tipo"
              value={Tipo}
              onChange={(e) => SetTipo(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {id ? "Guardar" : "Crear"}
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; 2025 Evaluacion. Byron Barriga</p>
      </footer>
    </div>
  );
}

export default Forminputeditcomponent;
