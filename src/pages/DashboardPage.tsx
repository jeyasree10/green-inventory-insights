import {
  Package,
  Flame,
  AlertTriangle,
  Clock,
  Archive,
  TrendingUp,
} from "lucide-react";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";

const carbonTrend = [
  { month: "Aug", value: 2100 }, { month: "Sep", value: 2400 }, { month: "Oct", value: 2200 },
  { month: "Nov", value: 2600 }, { month: "Dec", value: 2900 }, { month: "Jan", value: 2700 }, { month: "Feb", value: 2847 },
];

const pollutingComponents = [
  { name: "IC-2045", carbon: 450 }, { name: "CAP-100", carbon: 380 },
  { name: "RES-330", carbon: 320 }, { name: "TR-500", carbon: 290 }, { name: "LED-12", carbon: 210 },
];

const weeklyProduction = [
  { day: "Mon", units: 120 }, { day: "Tue", units: 145 }, { day: "Wed", units: 130 },
  { day: "Thu", units: 160 }, { day: "Fri", units: 140 }, { day: "Sat", units: 80 }, { day: "Sun", units: 40 },
];

const riskItems = [
  { label: "Capacitor C-200", status: "low-stock" as const, detail: "12 units remaining" },
  { label: "Resistor R-100", status: "expiring" as const, detail: "Expires in 5 days" },
  { label: "Inductor L-50", status: "dead-stock" as const, detail: "No usage in 90 days" },
  { label: "Diode D-300", status: "overstock" as const, detail: "2,400 excess units" },
  { label: "Transistor T-80", status: "low-stock" as const, detail: "8 units remaining" },
  { label: "IC-4052", status: "expiring" as const, detail: "Expires in 3 days" },
];

const DashboardPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of inventory and sustainability metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Total Components" value="1,284" icon={<Package className="h-5 w-5" />} trend={{ value: "3.2% vs last month", positive: true }} />
        <StatCard title="Carbon Used" value="2,847 kg" icon={<Flame className="h-5 w-5" />} variant="warning" trend={{ value: "5.1%", positive: false }} />
        <StatCard title="Low Stock" value="23" icon={<AlertTriangle className="h-5 w-5" />} variant="warning" />
        <StatCard title="Expiring Soon" value="8" icon={<Clock className="h-5 w-5" />} variant="critical" />
        <StatCard title="Dead Stock" value="14" icon={<Archive className="h-5 w-5" />} variant="critical" />
        <StatCard title="Overstock" value="31" icon={<TrendingUp className="h-5 w-5" />} variant="info" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Carbon Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={carbonTrend}>
              <defs>
                <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(152,55%,45%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(152,55%,45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(140,15%,89%)', fontSize: 12 }} />
              <Area type="monotone" dataKey="value" stroke="hsl(152,55%,45%)" fill="url(#carbonGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Most Polluting Components</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={pollutingComponents}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(160,10%,45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(140,15%,89%)', fontSize: 12 }} />
              <Bar dataKey="carbon" fill="hsl(205,65%,52%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Carbon: This Month vs Last Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={[
              { label: "Last Month", value: 2700 },
              { label: "This Month", value: 2847 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(140,15%,89%)', fontSize: 12 }} />
              <Bar dataKey="value" fill="hsl(152,55%,45%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Last 7 Days Production</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyProduction}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid hsl(140,15%,89%)', fontSize: 12 }} />
              <Line type="monotone" dataKey="units" stroke="hsl(25,95%,53%)" strokeWidth={2} dot={{ fill: "hsl(25,95%,53%)", r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Inventory Risk */}
      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Inventory Risk Alerts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {riskItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
