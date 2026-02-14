import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";

const velocityData = [
  { week: "W1", velocity: 45 }, { week: "W2", velocity: 52 }, { week: "W3", velocity: 38 },
  { week: "W4", velocity: 60 }, { week: "W5", velocity: 55 }, { week: "W6", velocity: 48 },
];

const consumptionMonthly = [
  { month: "Sep", used: 120 }, { month: "Oct", used: 145 }, { month: "Nov", used: 130 },
  { month: "Dec", used: 160 }, { month: "Jan", used: 140 }, { month: "Feb", used: 95 },
];

const carbonImpact = [
  { month: "Sep", carbon: 15 }, { month: "Oct", carbon: 18 }, { month: "Nov", carbon: 16 },
  { month: "Dec", carbon: 20 }, { month: "Jan", carbon: 17 }, { month: "Feb", carbon: 12 },
];

const stockSplit = [
  { name: "Available", value: 450 },
  { name: "Reserved", value: 50 },
];

const COLORS = ["hsl(152,55%,45%)", "hsl(205,65%,52%)"];

const ComponentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/components")} className="rounded-lg p-2 hover:bg-muted transition-colors">
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{id}</h1>
          <p className="text-sm text-muted-foreground">Component Detail & Analytics</p>
        </div>
        <StatusBadge status="active" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Manufacturing Date", value: "2024-06-15" },
          { label: "Expiry Date", value: "2026-08-15" },
          { label: "Shelf Life", value: "24 months" },
          { label: "Dead Stock", value: "No" },
        ].map((item) => (
          <div key={item.label} className="stat-card">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-lg font-bold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Velocity Graph</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={velocityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="velocity" stroke="hsl(152,55%,45%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Monthly Consumption</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={consumptionMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="used" fill="hsl(205,65%,52%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Carbon Impact</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={carbonImpact}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="carbon" fill="hsl(25,95%,53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-card border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Reserved vs Available</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={stockSplit} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {stockSplit.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetailPage;
