"use client";

import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface ChartProps {
  type:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick";
  height: number;
  series: any[];
  options?: any;
  width?: string | number;
}

export function Chart({
  type,
  height,
  width = "100%",
  series,
  options = {},
}: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const defaultOptions = {
      chart: {
        type,
        height,
        width,
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
        fontFamily: "inherit",
      },
      colors: ["#6366f1", "#22c55e", "#ef4444", "#f59e0b", "#06b6d4"],
      grid: {
        borderColor: "#e2e8f0",
        strokeDashArray: 4,
      },
      tooltip: {
        theme: "light",
      },
      ...options,
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ApexCharts(chartRef.current, {
      ...defaultOptions,
      series,
    });

    chartInstance.current.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, height, width, series, options]);

  return <div ref={chartRef} />;
}
