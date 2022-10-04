import "./App.css";
import { useState } from "react";
import formatDate from "./formatDate";

const today = formatDate(new Date());

function App() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=${startDate}T00:00&end_date=${endDate}T23:59&time_trunc=day`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.included);
      });
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <label>Fecha de Inicio
          <input
            type="date"
            name="startDate"
            max={today}
            onChange={(event) => setStartDate(event.target.value)} />
        </label>

        <label>Fecha Final
          <input
            type="date"
            name="endDate"
            min={startDate}
            max={today}
            onChange={(event) => setEndDate(event.target.value)} />
        </label>

        <button type="submit">
          Generar Gráfica
        </button>
      </form>
    </div>
  );
}

export default App;
