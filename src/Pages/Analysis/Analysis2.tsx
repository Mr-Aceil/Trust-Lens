import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, Download } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TimeRange = "1Y" | "1M" | "1W" | "1D";

interface SolvencyDataPoint {
  month: string;
  healthFactor: number; // percentage 0-100
}

interface AssetHealthDataPoint {
  month: string;
  totalTCAPSupply: number;  // in millions
  totalReserves: number;
  totalCollateralValue: number;
}

interface CollateralMixItem {
  label: string;
  value: number; // percentage
  color: string;
}

interface AnalyticsData {
  solvencyHistory: SolvencyDataPoint[];
  assetHealth: AssetHealthDataPoint[];
  collateralMix: CollateralMixItem[];
}

// ─── Mock data (replace with real API calls) ──────────────────────────────────

const MOCK_DATA: Record<TimeRange, AnalyticsData> = {
  "1Y": {
    solvencyHistory: [
      { month: "jan", healthFactor: 78 },
      { month: "feb", healthFactor: 90 },
      { month: "mar", healthFactor: 82 },
      { month: "aprl", healthFactor: 68 },
      { month: "may", healthFactor: 73 },
      { month: "jun", healthFactor: 62 },
      { month: "jul", healthFactor: 45 },
      { month: "aug", healthFactor: 62 },
      { month: "sep", healthFactor: 58 },
      { month: "oct", healthFactor: 80 },
      { month: "nov", healthFactor: 72 },
      { month: "dec", healthFactor: 83 },
    ],
    assetHealth: [
      { month: "jan", totalTCAPSupply: 1200, totalReserves: 600, totalCollateralValue: 900 },
      { month: "feb", totalTCAPSupply: 2100, totalReserves: 1400, totalCollateralValue: 1700 },
      { month: "mar", totalTCAPSupply: 2000, totalReserves: 1900, totalCollateralValue: 1500 },
      { month: "aprl", totalTCAPSupply: 2200, totalReserves: 2000, totalCollateralValue: 2000 },
      { month: "may", totalTCAPSupply: 2400, totalReserves: 2100, totalCollateralValue: 2200 },
      { month: "jun", totalTCAPSupply: 2600, totalReserves: 2300, totalCollateralValue: 2400 },
      { month: "jul", totalTCAPSupply: 2800, totalReserves: 2100, totalCollateralValue: 2500 },
      { month: "aug", totalTCAPSupply: 3000, totalReserves: 2400, totalCollateralValue: 2700 },
      { month: "sep", totalTCAPSupply: 3100, totalReserves: 2600, totalCollateralValue: 2900 },
      { month: "oct", totalTCAPSupply: 3300, totalReserves: 2900, totalCollateralValue: 3100 },
      { month: "nov", totalTCAPSupply: 3500, totalReserves: 3100, totalCollateralValue: 3300 },
      { month: "dec", healthFactor: 83, totalTCAPSupply: 3900, totalReserves: 3000, totalCollateralValue: 3200 },
    ],
    collateralMix: [
      { label: "ETH",   value: 45, color: "#2563EB" },
      { label: "WBTC",  value: 30, color: "#7C2424" },
      { label: "USDC",  value: 16, color: "#3D6B6B" },
      { label: "BNB",   value: 5,  color: "#F59E0B" },
      { label: "Others",value: 4,  color: "#9CA3AF" },
    ],
  },
  "1M": {
    solvencyHistory: Array.from({ length: 30 }, (_, i) => ({
      month: `${i + 1}`,
      healthFactor: Math.floor(50 + Math.random() * 45),
    })),
    assetHealth: Array.from({ length: 30 }, (_, i) => ({
      month: `${i + 1}`,
      totalTCAPSupply: Math.floor(2000 + Math.random() * 2000),
      totalReserves: Math.floor(1500 + Math.random() * 1500),
      totalCollateralValue: Math.floor(1800 + Math.random() * 1800),
    })),
    collateralMix: [
      { label: "ETH",   value: 43, color: "#2563EB" },
      { label: "WBTC",  value: 32, color: "#7C2424" },
      { label: "USDC",  value: 15, color: "#3D6B6B" },
      { label: "BNB",   value: 6,  color: "#F59E0B" },
      { label: "Others",value: 4,  color: "#9CA3AF" },
    ],
  },
  "1W": {
    solvencyHistory: Array.from({ length: 7 }, (_, i) => ({
      month: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
      healthFactor: Math.floor(60 + Math.random() * 35),
    })),
    assetHealth: Array.from({ length: 7 }, (_, i) => ({
      month: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i],
      totalTCAPSupply: Math.floor(3000 + Math.random() * 1200),
      totalReserves: Math.floor(2500 + Math.random() * 900),
      totalCollateralValue: Math.floor(2700 + Math.random() * 1000),
    })),
    collateralMix: [
      { label: "ETH",   value: 46, color: "#2563EB" },
      { label: "WBTC",  value: 29, color: "#7C2424" },
      { label: "USDC",  value: 17, color: "#3D6B6B" },
      { label: "BNB",   value: 4,  color: "#F59E0B" },
      { label: "Others",value: 4,  color: "#9CA3AF" },
    ],
  },
  "1D": {
    solvencyHistory: Array.from({ length: 24 }, (_, i) => ({
      month: `${i}:00`,
      healthFactor: Math.floor(65 + Math.random() * 30),
    })),
    assetHealth: Array.from({ length: 24 }, (_, i) => ({
      month: `${i}:00`,
      totalTCAPSupply: Math.floor(3500 + Math.random() * 600),
      totalReserves: Math.floor(2900 + Math.random() * 400),
      totalCollateralValue: Math.floor(3100 + Math.random() * 500),
    })),
    collateralMix: [
      { label: "ETH",   value: 45, color: "#2563EB" },
      { label: "WBTC",  value: 30, color: "#7C2424" },
      { label: "USDC",  value: 16, color: "#3D6B6B" },
      { label: "BNB",   value: 5,  color: "#F59E0B" },
      { label: "Others",value: 4,  color: "#9CA3AF" },
    ],
  },
};

// ─── API layer (swap mock for real endpoints) ─────────────────────────────────

async function fetchAnalyticsData(range: TimeRange): Promise<AnalyticsData> {
  // TODO: Replace with your real API call, e.g.:
  // const res = await fetch(`/api/analytics?range=${range}`);
  // if (!res.ok) throw new Error("Failed to fetch analytics");
  // return res.json();

  // Simulate network latency
  await new Promise((r) => setTimeout(r, 600));
  return MOCK_DATA[range];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HelpIcon({ tip }: { tip: string }) {
  return (
    <TooltipProvider>
      <UITooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-xs">{tip}</TooltipContent>
      </UITooltip>
    </TooltipProvider>
  );
}

function TimeRangePicker({
  value,
  onChange,
}: {
  value: TimeRange;
  onChange: (r: TimeRange) => void;
}) {
  const ranges: TimeRange[] = ["1Y", "1M", "1W", "1D"];
  return (
    <div className="flex gap-1">
      {ranges.map((r) => (
        <Button
          key={r}
          size="sm"
          variant={value === r ? "default" : "ghost"}
          className={`h-7 px-2.5 text-xs font-medium ${
            value === r ? "bg-blue-600 text-white hover:bg-blue-700" : "text-muted-foreground"
          }`}
          onClick={() => onChange(r)}
        >
          {r}
        </Button>
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return <Skeleton className="w-full h-[260px] rounded-lg" />;
}

// Custom tooltip for solvency chart
function SolvencyTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg shadow-lg px-3 py-2 text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      <p className="text-blue-600">Health Factor: {payload[0]?.value}%</p>
    </div>
  );
}

// Custom tooltip for asset health chart
function AssetTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-border rounded-lg shadow-lg px-3 py-2 text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value?.toLocaleString()}M
        </p>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Analysis() {
  const [range, setRange] = useState<TimeRange>("1Y");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Shared time range state — both charts move together
  // You can split them into independent states if needed
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchAnalyticsData(range)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [range]);

  const handleDownloadAudit = () => {
    // TODO: trigger your audit download endpoint
    console.log("Download audit for range:", range);
  };

  return (
    <div className="flex flex-col gap-5 p-6 bg-[#F3F4F6] min-h-screen">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <Button
          onClick={handleDownloadAudit}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Download className="w-4 h-4" />
          Download Audit
        </Button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          Failed to load analytics: {error}
        </div>
      )}

      {/* Row 1: Solvency + Asset Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Network Solvency History */}
        <Card className="bg-white border border-gray-200 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base font-semibold text-gray-900 leading-tight">
                Network solvency history{" "}
                <span className="font-normal text-gray-500">(Health factor %)</span>
              </CardTitle>
              <HelpIcon tip="The health factor represents the overall solvency ratio of the network. Values above 70% are considered healthy." />
            </div>
          </CardHeader>
          <CardContent>
            {/* Legend + time range */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded-sm bg-blue-600" />
                <span className="text-xs text-gray-500">Health factor</span>
              </div>
              <TimeRangePicker value={range} onChange={setRange} />
            </div>

            {loading ? (
              <ChartSkeleton />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart
                  data={data?.solvencyHistory}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#F0F0F0" vertical={true} strokeDasharray="0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}%`}
                    domain={[20, 100]}
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                    ticks={[20, 40, 60, 80, 100]}
                  />
                  <Tooltip content={<SolvencyTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="healthFactor"
                    stroke="#2563EB"
                    strokeWidth={2}
                    fill="url(#healthGradient)"
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Asset Health */}
        <Card className="bg-white border border-gray-200 shadow-none">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base font-semibold text-gray-900">
                Asset health
              </CardTitle>
              <HelpIcon tip="Tracks Total TCAP supply, total protocol reserves, and total collateral value over time (in millions)." />
            </div>
          </CardHeader>
          <CardContent>
            {/* Legend + time range */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-wrap items-center gap-3">
                {[
                  { key: "totalTCAPSupply",    label: "Total TCAP supply",    color: "#2563EB" },
                  { key: "totalReserves",       label: "Total reserves",       color: "#4B7C3F" },
                  { key: "totalCollateralValue",label: "Total Collateral Value",color: "#7C2424" },
                ].map((s) => (
                  <div key={s.key} className="flex items-center gap-1.5">
                    <span className="inline-block w-3 h-3 rounded-sm" style={{ background: s.color }} />
                    <span className="text-xs text-gray-500">{s.label}</span>
                  </div>
                ))}
              </div>
              <TimeRangePicker value={range} onChange={setRange} />
            </div>

            {loading ? (
              <ChartSkeleton />
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <LineChart
                  data={data?.assetHealth}
                  margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
                >
                  <CartesianGrid stroke="#F0F0F0" vertical={true} strokeDasharray="0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `${v}M`}
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<AssetTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="totalTCAPSupply"
                    name="Total TCAP supply"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalReserves"
                    name="Total reserves"
                    stroke="#4B7C3F"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalCollateralValue"
                    name="Total Collateral Value"
                    stroke="#7C2424"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Collateral Mix */}
      <Card className="bg-white border border-gray-200 shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">
              Collateral mix
            </CardTitle>
            <HelpIcon tip="Breakdown of all collateral assets backing the protocol, shown as percentage of total collateral value." />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="w-full h-[80px] rounded-lg" />
          ) : (
            <>
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mb-4">
                {data?.collateralMix.map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-3 h-3 rounded-sm"
                      style={{ background: item.color }}
                    />
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Stacked bar */}
              <div className="w-full h-12 flex rounded-md overflow-hidden">
                {data?.collateralMix.map((item) => (
                  <div
                    key={item.label}
                    style={{ width: `${item.value}%`, background: item.color }}
                    className="relative group transition-all duration-300"
                    title={`${item.label}: ${item.value}%`}
                  >
                    {/* Hover tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:flex items-center bg-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                      {item.label}: {item.value}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Axis labels */}
              <div className="flex justify-between mt-2">
                {[0, 20, 40, 60, 80, 100].map((v) => (
                  <span key={v} className="text-[11px] text-gray-400">
                    {v}%
                  </span>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
