import React from "react";

function dashboardcomponent() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <header className="bg-primary text-white text-center py-5">
        <h1>Bienvenido!!</h1>
        <p>Selecciona una opcion para comenzar</p>
      </header>

      <main className="container my-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3">
            <a
              href="/registros"
              className="btn btn-lg btn-outline-primary w-100 py-3"
            >
              Registros
            </a>
          </div>
          <div className="col-md-4 mb-3">
            <a
              href="/formularios"
              className="btn btn-lg btn-outline-success w-100 py-3"
            >
              Formularios
            </a>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <p>&copy; 2025 Evaluacion. Byron Barriga</p>
      </footer>
    </div>
  );
}

export default dashboardcomponent;
