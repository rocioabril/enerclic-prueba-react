import { useState } from "react";
import Chart from "./Chart";
import formatDate from "./formatDate";
import "./App.css";

const today = formatDate(new Date());

function App() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true);

    fetch(`https://apidatos.ree.es/es/datos/balance/balance-electrico?start_date=${startDate}T00:00&end_date=${endDate}T23:59&time_trunc=day`)
      .then((res) => res.json())
      .then((json) => {
        setData({
          labels: json.included[0].attributes.content[0].attributes.values.map(item => item.datetime.split("T")[0]),
          datasets: json.included[0].attributes.content.map(type => ({
            label: type.attributes.title,
            data: type.attributes.values.map(item => item.value),
            borderColor: type.attributes.color,
            backgroundColor: type.attributes.color + "30",
            tension: 0.3
          }))
        })
        setIsLoading(false);
      });
  }

  return (
    <div>
      <header>
        ENERCLIC Prueba
      </header>

      <main>
        <form onSubmit={handleSubmit}>
          <label><p>Fecha de Inicio</p>
            <input
              type="date"
              name="startDate"
              className="inputDate"
              max={today}
              onChange={(event) => setStartDate(event.target.value)} />
          </label>

          <label><p>Fecha Final</p>
            <input
              type="date"
              name="endDate"
              className="inputDate form-label"
              min={startDate}
              max={today}
              onChange={(event) => setEndDate(event.target.value)} />
          </label>

          <button type="submit" className="buttonBuscar" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Buscar"}
          </button>
        </form>

        <Chart data={data} />
      </main>
    </div>
  );
}

export default App;
