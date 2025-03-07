import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Registercreatecomponent() {
  const navigate = useNavigate();
  const [formularios, setFormularios] = useState([]);
  const [formularioSeleccionado, setFormularioSeleccionado] = useState(null);
  const [campos, setCampos] = useState([]);
  const [valores, setValores] = useState({});

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5218/api/Formularios"
        );
        setFormularios(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching formularios:", error);
      }
    };
    fetchFormularios();
  }, []);

  const handleFormularioChange = async (e) => {
    const formularioId = e.target.value;
    if (formularioId) {
      try {
        const response = await axios.get(
          `http://localhost:5218/api/Campos/F/${formularioId}`
        );
        setCampos(response.data);

        const responseFormulario = await axios.get(
          `http://localhost:5218/api/Formularios/${formularioId}`
        );
        setFormularioSeleccionado(responseFormulario.data);

        const initialValues = {};
        response.data.forEach((campo) => {
          initialValues[campo.campoNombre] = "";
        });
        setValores(initialValues);
      } catch (error) {
        console.error("Error fetching campos:", error);
      }
    } else {
      setFormularioSeleccionado(null);
      setCampos([]);
      setValores({});
    }
  };

  const handleInputChange = (e, campoNombre) => {
    setValores({
      ...valores,
      [campoNombre]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formularioSeleccionado) {
      alert("Por favor, selecciona un formulario.");
      return;
    }

    try {
      const request = {
        formularioID: formularioSeleccionado.formularioID,
        valores: valores,
      };
      console.log(request);
      await axios.post("http://localhost:5218/api/Registros", request);
      alert("Información guardada correctamente");
      navigate("/registros");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error al guardar la información");
    }
  };

  const getInputType = (tipo) => {
    switch (tipo) {
      case "text":
        return "text";
      case "number":
        return "number";
      case "date":
        return "date";
      case "email":
        return "email";
      default:
        return "text";
    }
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
            <p className="mt-3">Nuevo Registro</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container my-2 flex-grow-1">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>
              Selecciona un formulario:
              <select
                onChange={handleFormularioChange}
                className="form-control"
              >
                <option value="" className="form-control">
                  -- Selecciona un formulario --
                </option>
                {formularios.map((formulario) => (
                  <option
                    key={formulario.formularioID}
                    value={formulario.formularioID}
                  >
                    {formulario.formularioNombre}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {campos.map((campo) => (
            <div key={campo.campoID}>
              <label className="form-label">
                {campo.campoNombre}:
                <input
                  className="form-control"
                  type={getInputType(campo.campoTipo)}
                  value={valores[campo.campoNombre] || ""}
                  onChange={(e) => handleInputChange(e, campo.campoNombre)}
                />
              </label>
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Guardar
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

export default Registercreatecomponent;
