import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const url = "http://localhost:5218/api/Formularios";

function Formeditcomponent() {
  const { id } = useParams();
  const navegacion = useNavigate();
  const [FormularioNombre, SetFormularioNombre] = useState("");

  useEffect(() => {
    if (id) {
      const FormularioID = parseInt(id, 10);
      const GetFormulario = async () => {
        try {
          const response = await axios.get(`${url}/${FormularioID}`);
          SetFormularioNombre(response.data.formularioNombre);
          console.log(response.data);
        } catch (error) {
          console.error("Error al obtener el formulario:", error);
        }
      };
      GetFormulario();
    }
  }, [id]);

  const handleCreate = async () => {
    try {
      await axios.post(url, {
        formularioNombre: FormularioNombre,
      });
      navegacion("/formularios");
    } catch (error) {
      console.error("Error al crear el formulario:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${url}/${id}`, {
        formularioID: id,
        formularioNombre: FormularioNombre,
      });
      navegacion("/formularios");
    } catch (error) {
      console.error("Error al actualizar el formulario:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!FormularioNombre.trim()) {
      alert("El nombre del formulario no puede estar vacío.");
      return;
    }

    if (id) {
      await handleEdit();
    } else {
      await handleCreate();
    }
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <header className="bg-primary text-white text-center py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <a className="btn btn-outline-light" href="/formularios">
              <i className="bi bi-arrow-left"></i> Volver
            </a>
            <h1 className="m-0">Formulario</h1>
            <div style={{ width: "100px" }}></div>
          </div>
          <div>
            {id ? (
              <p className="mt-3">Editar: {FormularioNombre}</p>
            ) : (
              <p className="mt-3">Nuevo Formulario</p>
            )}
          </div>
        </div>
      </header>

      <main className="container my-4 flex-grow-1">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formularioNombre" className="form-label">
              Nombre del Formulario:
            </label>
            <input
              type="text"
              className="form-control"
              id="formularioNombre"
              value={FormularioNombre}
              onChange={(e) => SetFormularioNombre(e.target.value)}
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

export default Formeditcomponent;
