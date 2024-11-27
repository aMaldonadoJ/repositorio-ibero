import React, { useState } from 'react';
import { IberoDashboard, InstitucionesDashboard } from '../components';
import data from "../data/baseVisualizadorComparativo.json";
import { arrowRight } from '../assets';

const DashboardGeneral = () => {
    // Estado para el programa seleccionado, con el valor predeterminado "Seleccionar Programa"
    const [selectedProgram, setSelectedProgram] = useState("Seleccionar Programa");

    // Manejar cambios en el menú desplegable
    const handleProgramChange = (event) => {
        setSelectedProgram(event.target.value); // Actualiza el programa seleccionado
    };

    // Filtrar los programas de la Ibero para mostrarlos en el select
    const programasIbero = [...new Map(
        data.programas
            .filter((programa) => programa.institucion === "Ibero") // Filtrar solo programas de la Ibero
            .map((programa) => [programa.cve_programa, programa]) // Crear un Map único basado en cve_programa
    ).values()];

    return (
        <div className="max-w-[1280px] mx-auto p-6 bg-gray-100 relative h-full">
            <div className="flex justify-between items-center mb-6 ">


                {/* Menú desplegable */}
                <select
                    className="flex min-w-[120px] px-2 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2"
                    value={selectedProgram}
                    onChange={handleProgramChange}
                >

                    {/* Opción inicial para seleccionar programa */}
                    <option value="Seleccionar Programa">Seleccionar Programa</option>

                    {/* Mapear programas de la Ibero al dropdown */}
                    {programasIbero.map((programa) => (
                        <option key={programa.id} value={programa.cve_programa}>
                            {programa.nombre_programa} {/* Mostrar el nombre con acentos */}
                        </option>
                    ))}
                </select>





                {/* Leyenda horizontal */}
                <div className="flex space-x-4 items-center">
                    {/* Ítems de la leyenda */}
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-greenBase"></span>
                        <span className="ml-2 text-sm text-gray-600">Presencial</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-darkblue"></span>
                        <span className="ml-2 text-sm text-gray-600">En línea</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-mustard"></span>
                        <span className="ml-2 text-sm text-gray-600">Híbrido</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-redlight"></span>
                        <span className="ml-2 text-sm text-gray-600">Presencial y en Línea</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-gray300"></span>
                        <span className="ml-2 text-sm text-gray-600">Presencial, Híbrido, en Línea</span>
                    </div>
                </div>
            </div>

            {/* Renderizar el dashboard basado en el programa seleccionado */}
            {selectedProgram && (
                <div>
                    {/* Pasamos selectedProgram como prop a IberoDashboard */}
                    <IberoDashboard selectedProgram={selectedProgram} />
                    <InstitucionesDashboard selectedProgram={selectedProgram} />
                </div>
            )}

            <div className="font-noto text-base text-blue400 mt-8 pb-10">
                <p>*La información no pudo ser verificada por falta de respuesta a las solicitudes de contacto.
                </p>
            </div>
        </div>
    );
};

export default DashboardGeneral;
