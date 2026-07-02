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

// Peso/avance de cada fase hacia el cierre (fracción 0-1).
const PHASE_WEIGHT = [0.15, 0.3, 0.5, 0.7, 0.85, 1.0];
// Tier de engagement → fracción 0-1.
// OJO: 0 = "Quiere empezar ya" (máximo) … 3 = "Quiere colgar" (mínimo).
const TIER_FRACTION = [1, 0.66, 0.33, 0];

const PHASE_VARS = [
  "--phase-presentation",
  "--phase-qualify",
  "--phase-diagnosis",
  "--phase-solution",
  "--phase-contract",
  "--phase-sign",
];

type ConversionChartProps = {
  steps: readonly string[];
  currentStep: number;
  engagementByPhase: number[];
  compact?: boolean;
};

const ConversionChart = ({
  steps,
  currentStep,
  engagementByPhase,
  compact = false,
}: ConversionChartProps) => {
  const color = `hsl(var(${PHASE_VARS[currentStep] ?? PHASE_VARS[0]}))`;

  const data = steps.map((name, i) => {
    const tier = engagementByPhase[i] ?? 1;
    // Conversión = tier (engagement) × peso de la fase.
    const value = Math.round(
      (TIER_FRACTION[tier] ?? 0.33) * (PHASE_WEIGHT[i] ?? 0) * 100,
    );
    return {
      name,
      short: `F${i + 1}`,
      // Solo trazamos las fases ya recorridas (hasta la actual).
      actual: i <= currentStep ? value : null,
    };
  });

  const current = data[currentStep];

  return (
    <div className={`rounded-xl border bg-card ${compact ? "px-3 py-2" : "mb-4 p-4"}`}>
      <div className={`flex items-baseline justify-between ${compact ? "mb-1" : "mb-2"}`}>
        <span className="text-xs font-semibold text-muted-foreground">
          Cercanía a convertir
        </span>
        <span className="text-sm font-bold" style={{ color }}>
          {current?.actual ?? 0}%
        </span>
      </div>
      <ResponsiveContainer width="100%" height={compact ? 60 : 140}>
        <AreaChart
          data={data}
          margin={compact ? { top: 6, right: 8, left: 8, bottom: 0 } : { top: 8, right: 8, left: -24, bottom: 0 }}
        >
          <defs>
            <linearGradient id="convFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          {!compact && (
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
          )}
          <XAxis
            dataKey="short"
            tick={{ fontSize: compact ? 9 : 11 }}
            axisLine={false}
            tickLine={false}
            height={compact ? 14 : undefined}
          />
          {!compact && (
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={36}
            tickFormatter={(v) => `${v}%`}
          />
          )}
          {compact && <YAxis domain={[0, 100]} hide />}
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