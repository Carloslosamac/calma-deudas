import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Progreso base hacia la conversión por fase (0-100).
const PHASE_BASE = [15, 35, 60, 85, 100];
// Factor según el engagement actual (0-3).
const ENGAGEMENT_FACTOR = [0.6, 0.85, 1, 1.1];

const PHASE_VARS = [
  "--phase-qualify",
  "--phase-diagnosis",
  "--phase-solution",
  "--phase-contract",
  "--phase-sign",
];

type ConversionChartProps = {
  steps: readonly string[];
  currentStep: number;
  engagement: number;
};

const ConversionChart = ({
  steps,
  currentStep,
  engagement,
}: ConversionChartProps) => {
  const factor = ENGAGEMENT_FACTOR[engagement] ?? 1;
  const color = `hsl(var(${PHASE_VARS[currentStep] ?? PHASE_VARS[0]}))`;

  const data = steps.map((name, i) => {
    const value = Math.min(100, Math.round(PHASE_BASE[i] * factor));
    return {
      name,
      short: `F${i + 1}`,
      // Trazo sólido hasta la fase actual; proyección a partir de ahí.
      actual: i <= currentStep ? value : null,
      proyeccion: i >= currentStep ? value : null,
    };
  });

  const current = data[currentStep];

  return (
    <div className="mb-4 rounded-xl border bg-card p-4">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-xs font-semibold text-muted-foreground">
          Cercanía a convertir
        </span>
        <span className="text-sm font-bold" style={{ color }}>
          {current?.actual ?? 0}%
        </span>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
        >
          <defs>
            <linearGradient id="convFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
          <XAxis
            dataKey="short"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={36}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: "3 3" }}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--popover))",
              fontSize: 12,
            }}
            formatter={(value: number | null) =>
              value == null ? ["—", ""] : [`${value}% cerca de convertir`, ""]
            }
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.name ?? ""
            }
          />
          <Area
            type="monotone"
            dataKey="proyeccion"
            stroke={color}
            strokeWidth={1.5}
            strokeDasharray="5 4"
            fill="none"
            connectNulls
            dot={false}
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke={color}
            strokeWidth={2.5}
            fill="url(#convFill)"
            connectNulls
            dot={{ r: 3, fill: color }}
            isAnimationActive={false}
          />
          {current?.actual != null && (
            <ReferenceDot
              x={current.short}
              y={current.actual}
              r={5}
              fill={color}
              stroke="hsl(var(--background))"
              strokeWidth={2}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ConversionChart;