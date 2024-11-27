import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import data from "../data/baseVisualizadorComparativo.json";
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importa el plugin

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);


const IberoDashboard = ({ selectedProgram }) => {
  // Filtrar solo los datos de la Ibero
  const iberoData = data.programas.filter(
    (programa) => programa.institucion.toLowerCase() === "ibero"
  );

  // Si hay un programa seleccionado, filtrar aún más
  const filteredData = selectedProgram
    ? iberoData.filter(
      (programa) => programa.cve_programa === selectedProgram
    )
    : iberoData;

  // Crear datos para el gráfico de barras
  const getBarChartDataDuracion = (duracion) => {
    return {
      labels: [''],
      datasets: [
        {
          label: 'Duración (Horas)',
          data: [duracion],
          backgroundColor: '#04AFA0', // Color de la barra
        },

      ],
    };
  };

  // Crear datos para el gráfico de barras
  const getBarChartDataCosto = (costo) => {
    return {
      labels: [''],
      datasets: [
        {
          label: 'Costo (MXN)',
          data: [costo],
          backgroundColor: '#04AFA0', // Color de la barra
          
        },

      ],
    };
  };

  // Verificar si programaSeleccionado está correctamente
  console.log("Programa seleccionado: ", selectedProgram);
  console.log("Datos filtrados: ", filteredData);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4 font-noto text-redBase">Programas Ibero</h2>
      <div className="overflow-x-auto">
        <div className="grid grid-rows-[20px_2fr] grid-cols-[100px_1fr_250px_2fr_2fr] gap-4 bg-blue400 border border-gray-300 rounded-xl shadow-md min-h-[200px]">
          {/* Encabezados de las columnas */}
          <div className="px-4 py-2 text-sm font-normal text-blue100 mt-3 text-center justify-center">Categoría</div>
          <div className="px-4 py-2 text-sm font-normal text-blue100 mt-3 text-center justify-center">Institución</div>
          <div className="px-4 py-2 text-sm font-normal text-blue100 mt-3 text-center justify-center">Nombre del programa</div>
          <div className="px-4 py-2 text-sm font-normal text-blue100 mt-3 ">Duración (Horas)</div>
          <div className="px-4 py-2 text-sm font-normal text-blue100 mt-3 ">Costo (MXN)</div>

          {/* Aquí renderizamos los datos filtrados */}
          {filteredData.length > 0 ? (
            filteredData.map((programa) => (
              <React.Fragment key={programa.id}>
                <div className="flex px-4 py-2 text-base font-medium text-white items-center text-center justify-center leading-tight">{programa.categoria}</div>
                <div className="flex px-4 py-2 text-base font-medium text-white items-center text-center justify-center leading-tight">{programa.institucion}</div>
                <div className="flex px-4 py-2 text-base font-medium text-white items-center text-center justify-center leading-tight">{programa.nombre_programa}</div>

                {/* Gráfico de barras para Duración (Horas) */}
                <div className="flex px-4 text-sm text-gray-700 items-center max-h-[120px]">
                  <Bar
                    data={getBarChartDataDuracion(programa.duracion)}
                    options={{
                      responsive: true,
                      layout: {
                        padding: {
                          top: 20, // Ajusta este valor según sea necesario
                          bottom: 20
                        }
                      },
                      plugins: {
                        title: { display: false },
                        legend: { display: false },
                        // Plugin para mostrar etiquetas de valores
                        datalabels: {
                          display: true, // Muestra las etiquetas
                          color: '#FFFFFF', // Color del texto
                          align: 'end', // Alineación del texto (puede ser 'start', 'end', 'center')
                          font: {
                            size: 16, // Tamaño de la fuente (ajústalo según tu necesidad)
                            weight: 400, // Negritas
                          },
                          anchor: 'start', // Ubicación relativa al gráfico
                          formatter: (value) => {
                            // Formatear valores con separadores de miles
                            return `${new Intl.NumberFormat('en-US').format(value)} hrs.`;
                          },
                        },
                      },
                      indexAxis: 'y',  // Cambiar la orientación de la barra a horizontal
                      scales: {
                        x: {
                          beginAtZero: true,  // Asegura que el eje X empiece desde cero
                          max: 700,  // Fijamos el máximo a 400 horas  
                          grid: {
                            color: '#D4E0E7', // Color de la línea de la cuadrícula (eje X)
                            lineWidth: 0.5,  // Ancho de las líneas de la cuadrícula
                            drawOnChartArea: false, // No dibujar la cuadrícula en el área del gráfico
                            borderColor: '#D4E0E7', // Color de la línea de borde del eje X
                          },
                          ticks: {
                            stepSize: 350,
                            color: '#9EBAC8',  // Color de los ticks en el eje X
                          },
                          border: {
                            display: true, // Muestra el borde del eje
                            color: '#9EBAC8', // Color de la línea del eje X
                            width: .75, // Grosor de la línea
                          },
                        },
                        y: {
                          ticks: {
                            display: false
                          },
                          grid: {
                            lineWidth: 0.5,  // Ancho de las líneas de la cuadrícula
                            drawOnChartArea: false, // No dibujar la cuadrícula en el área del gráfico
                            drawTicks: false, // No dibujar los ticks en el eje Y
                            borderColor: '#D4E0E7', // Color de la línea de borde en el eje X
                          },
                          border: {
                            display: false, // Muestra el borde del eje
                            color: '#9EBAC8', // Color de la línea del eje X
                            width: .75, // Grosor de la línea
                          },
                        }
                      }
                    }}
                  />
                </div>

                {/* Gráfico de barras para Costo (MXN) */}
                <div className="flex px-4 text-sm text-gray-700 items-center max-h-[120px]">
                  <Bar
                    data={getBarChartDataCosto(programa.costo)}
                    options={{
                      responsive: true,
                      layout: {
                        padding: {
                          top: 20, // Ajusta este valor según sea necesario
                          bottom: 20
                        }
                      },
                      plugins: {
                        title: { display: false },
                        legend: { display: false },
                        datalabels: {
                          display: true, // Muestra las etiquetas
                          color: '#FFFFFF', // Color del texto
                          align: 'end', // Alineación del texto (puede ser 'start', 'end', 'center')
                          anchor: 'start', // Ubicación relativa al gráfico
                          font: {
                            size: 16, // Tamaño de la fuente (ajústalo según tu necesidad)
                            weight: 400, // Negritas
                          },
                          formatter: (value) => {
                            // Formatear valores con separadores de miles
                            return `$${new Intl.NumberFormat('en-US').format(value)}`;
                          },
                        },
                      },
                      indexAxis: 'y',  // Cambiar la orientación de la barra a horizontal
                      scales: {
                        x: {
                          beginAtZero: true,  // Asegura que el eje X empiece desde cero
                          max: 40000,  // Fijamos el máximo a 400 horas
                          grid: {
                            color: '#D4E0E7', // Color de la línea de la cuadrícula (eje X)
                            lineWidth: 0.5,  // Ancho de las líneas de la cuadrícula
                            drawOnChartArea: false, // No dibujar la cuadrícula en el área del gráfico
                            borderColor: '#D4E0E7', // Color de la línea de borde del eje X
                          },
                          ticks: {
                            color: '#9EBAC8',  // Color de los ticks en el eje X
                            stepSize: 20000,
                          },
                          border: {
                            display: true, // Muestra el borde del eje
                            color: '#9EBAC8', // Color de la línea del eje X
                            width: .75, // Grosor de la línea
                          },
                        },
                        y: {
                          ticks: {
                            display: false
                          },
                          grid: {
                            lineWidth: 0.5,  // Ancho de las líneas de la cuadrícula
                            drawOnChartArea: false, // No dibujar la cuadrícula en el área del gráfico
                            drawTicks: false, // No dibujar los ticks en el eje Y
                            borderColor: '#D4E0E7', // Color de la línea de borde en el eje X
                          },
                          border: {
                            display: false, // Muestra el borde del eje
                            color: '#9EBAC8', // Color de la línea del eje X
                            width: .75, // Grosor de la línea
                          },
                        }
                      },

                    }}
                  />
                </div>

              </React.Fragment>
            ))
          ) : (
            <div
              colSpan="5"
              className="flex col-span-5 px-4 py-2 text-center text-base text-blue100 justify-center items-center"
            >
              Porfavor, seleccione un programa en el menú desplegable.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IberoDashboard;