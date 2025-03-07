import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Registerlistcomponent() {
  const { id } = useParams();
  const [campos, setCampos] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [Formulario, setFormulario] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const formularioID = parseInt(id, 10);
        const responseCampos = await axios.get(
          `http://localhost:5218/api/Campos/F/${formularioID}`
        );
        setCampos(responseCampos.data);
        setFormulario(responseCampos.data[0].formularioNombre);
        const responseRegistros = await axios.get(
          `http://localhost:5218/api/Registros/F/${formularioID}`
        );
        setRegistros(responseRegistros.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Función para obtener el valor de un campo específico en un registro
  const getValorCampo = (registro, campoNombre) => {
    const valores = JSON.parse(registro.valores);
    return valores[campoNombre] || "-"; // Si no hay valor, mostrar un guion
  };
  return (
    <div className="App d-flex flex-column min-vh-100">
      <header className="bg-primary text-white text-center py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <a className="btn btn-outline-light" href="/registros">
              <i className="bi bi-arrow-left"></i> Volver
            </a>
            <h1 className="m-0">Registro</h1>
            <div style={{ width: "100px" }}></div>
          </div>
          <div>
            <p className="mt-3">Formulario : {Formulario}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-4 flex-grow-1">
        <div className="col-12 col-lg-12 offset-0 offset-lg-0">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  {campos.map((campo) => (
                    <th key={campo.campoID}>{campo.campoNombre}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {registros.length > 0 ? (
                  registros.map((registro) => (
                    <tr key={registro.registroID}>
                      {campos.map((campo) => (
                        <td key={campo.campoID}>
                          {getValorCampo(registro, campo.campoNombre)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No tiene Registros
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

export default Registerlistcomponent;
