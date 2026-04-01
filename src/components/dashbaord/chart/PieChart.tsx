import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ percentage }: { percentage: number }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [
          "#2563eb", // Blue, more corporate/professional
          "#f3f4f6"  // Light gray for background
        ],
        borderColor: [
          "#2563eb",
          "#f3f4f6"
        ],
        borderWidth: 2,
        cutout: "78%",
        rotation: -90,
        circumference: 180,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    cutout: "78%",
    layout: {
      padding: 0,
    }
  };

  return (
    <div className="relative mx-auto bg-white/90 rounded-2xl shadow-xl flex items-center justify-center
      w-full max-w-[350px] h-[34vw] min-h-[130px] min-w-[180px] sm:min-h-[150px] md:min-h-[180px] 
      md:max-w-[320px] md:h-[210px] xl:max-w-[340px] xl:h-[230px]
      "
    >
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-[8vw] sm:text-[32px] md:text-[36px] lg:text-[40px] font-extrabold text-blue-600 drop-shadow">
          {percentage}%
        </span>
        <span className="text-[3.5vw] sm:text-xs md:text-sm text-slate-500 font-medium tracking-wide uppercase mt-1">
          Progress
        </span>
      </div>
      {/* Subtle gloss effect for depth */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 via-transparent to-transparent rounded-t-2xl pointer-events-none" />
    </div>
  );
};

export default PieChart;