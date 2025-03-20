"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { io, Socket } from "socket.io-client";
import { ApexOptions } from "apexcharts";

// Importación dinámica para evitar problemas con SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Interfaz para los eventos
interface MaletaUpdate {
  maletaId: number;
  estado_actual: string;
  current_location: string;
  updatedAt: string;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:5000";

export default function DashboardChartWithSocket() {
 
  // Nueva serie: la usamos para guardar cada actualización como un dato (x: fecha, y: contador)
  const [series, setSeries] = useState([
    { name: "Maleta Updates", data: [] as { x: string; y: number }[] },
  ]);

  // Opciones del gráfico, configuradas para un eje X datetime
  const options:ApexOptions  = {
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd MMM HH:mm",
      },
    },
    yaxis: {
      title: { text: "Eventos" },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 4,
    },
    tooltip: {
      x: { format: "dd MMM yyyy HH:mm" },
    },
    legend: {
      show: true,
    },
  } ;

  // Conexión y manejo de eventos de Socket.io
  useEffect(() => {
    const socketIo = io(SOCKET_URL);
 
    socketIo.on("welcome", (data: any) => {
      console.log("Mensaje de bienvenida:", data);
 
    });

    socketIo.on("maletaUpdate", (data: MaletaUpdate) => {
      console.log("Actualización recibida:", data);
      setSeries((prevSeries) => {
        const newDataPoint = {
          x: data.updatedAt,
          y: prevSeries[0].data.length + 1,
        };
        return [
          {
            ...prevSeries[0],
            data: [...prevSeries[0].data, newDataPoint],
          },
        ];
      });
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <div className="p-5">
      {/* Tarjeta del Chart */}
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Statistics
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              Datos de los eventos en tiempo real
            </p>
          </div>
 
        </div>

        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <div className="min-w-[1000px] xl:min-w-full">
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={310}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
