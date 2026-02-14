import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const highUsage = [
  { name: "RES-330", usage: 480 }, { name: "LED-12", usage: 420 }, { name: "CAP-100", usage: 380 },
  { name: "IC-2045", usage: 320 }, { name: "DIO-300", usage: 260 },
];

const lowUsage = [
  { name: "TR-500", usage: 12 }, { name: "IND-50", usage: 25 }, { name: "CON-22", usage: 40 },
];

const monthlyConsumption = [
  { month: "Sep", total: 820 }, { month: "Oct", total: 950 }, { month: "Nov", total: 880 },
  { month: "Dec", total: 1100 }, { month: "Jan", total: 1020 }, { month: "Feb", total: 760 },
];

const turnover = [
  { month: "Sep", rate: 3.2 }, { month: "Oct", rate: 3.8 }, { month: "Nov", rate: 3.5 },
  { month: "Dec", rate: 4.1 }, { month: "Jan", rate: 3.9 }, { month: "Feb", rate: 3.0 },
];

const InventoryAnalyticsPage = () => (
  <div className="space-y-5 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Inventory Analytics</h1>
      <p className="text-sm text-muted-foreground">Usage patterns and stock performance metrics</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">High Usage Components</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={highUsage} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="hsl(160,10%,45%)" width={70} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="usage" fill="hsl(152,55%,45%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Low Usage Components</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={lowUsage} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} stroke="hsl(160,10%,45%)" width={70} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Bar dataKey="usage" fill="hsl(0,72%,55%)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Consumption</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={monthlyConsumption}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="total" stroke="hsl(205,65%,52%)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-card border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">Stock Turnover Rate</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={turnover}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="rate" stroke="hsl(25,95%,53%)" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default InventoryAnalyticsPage;
