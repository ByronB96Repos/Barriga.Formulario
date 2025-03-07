import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const url = "http://localhost:5218/api/Campos";

function Forminputlistcomponent() {
  const { id } = useParams();
  const navegacion = useNavigate();
  const [lstCampos, SetltsCampos] = useState([]);
  const [FormularioNombre, SetFormularioNombre] = useState("");

  useEffect(() => {
    GetCampos();
  }, []);

  const GetCampos = async () => {
    const FormularioID = parseInt(id, 10);
    const response = await axios.get(`${url}/F/${FormularioID}`);
    SetltsCampos(response.data);
    console.log(response.data);
    if (response.data.length > 0) {
      SetFormularioNombre(response.data[0].formularioNombre);
    } else {
      GetFormulario();
    }
  };

  const GetFormulario = async () => {
    const FormularioID = parseInt(id, 10);
    try {
      const response = await axios.get(
        `http://localhost:5218/api/Formularios/${FormularioID}`
      );
      SetFormularioNombre(response.data.formularioNombre);
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener el formulario:", error);
    }
  };

  const handleCreate = () => {
    navegacion(`/formulario/${id}/campo/Create`);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${url}/${id}`);
    GetCampos();
  };

  const handleEdit = (id) => {
    navegacion(`/formulario/campo/Edit/${id}`);
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <header className="bg-primary text-white text-center py-2">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <a className="btn btn-outline-light" href="/formularios">
              <i className="bi bi-arrow-left"></i> Volver
            </a>
            <h1 className="m-0">Formulario : {FormularioNombre}</h1>
            <button
              className="btn btn-success"
              onClick={() => handleCreate(id)}
            >
              <i className="bi bi-plus-lg"></i> Nuevo Campo
            </button>
          </div>
          <p className="mt-3">Lista de Campos</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-4 flex-grow-1">
        <div className="col-12 col-lg-12 offset-0 offset-lg-0">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {lstCampos.length > 0 ? (
                  lstCampos.map((campo, i) => (
                    <tr key={campo.campoID}>
                      <td>{i + 1}</td>
                      <td>{campo.campoNombre}</td>
                      <td>{campo.campoTipo}</td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => handleEdit(campo.campoID)}
                          >
                            <i className="bi bi-pencil-square"></i> Editar
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(campo.campoID)}
                          >
                            <i className="bi bi-trash3-fill"></i> Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No tiene Campos Registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; 2025 Evaluacion. Byron Barriga</p>
      </footer>
    </div>
  );
}

export default Forminputlistcomponent;
