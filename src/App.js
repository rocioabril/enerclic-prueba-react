import "./App.css";
import { useState } from "react";
import formatDate from "./formatDate";
import Chart from "./Chart";

const today = formatDate(new Date());

function App() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [data, setData] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=${startDate}T00:00&end_date=${endDate}T23:59&time_trunc=day`)
      .then((res) => res.json())
      .then((json) => {
        const attributes = json.included[0].attributes.content[1].attributes;
        setData({
          labels: attributes.values.map(item => item.datetime.split("T")[0]),
          datasets: [
            {
              label: attributes.title,
              data: attributes.values.map(item => item.value),
              borderColor: attributes.color,
              backgroundColor: attributes.color
            },
          ],
        })
      });
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <label><p>Fecha de Inicio</p>
          <input
            type="date"
            name="startDate"
            max={today}
            onChange={(event) => setStartDate(event.target.value)} />
        </label>

        <label><p>Fecha Final</p>
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
      <Chart data={data} />
    </div>
  );
}

export default App;
