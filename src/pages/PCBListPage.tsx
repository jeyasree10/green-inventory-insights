import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const pcbs = [
  { id: "PCB-001", name: "Main Control Board", components: 12, qtyPerPcb: 1, carbon: 45.2, deps: [{ name: "IC-2045", qty: 2 }, { name: "CAP-100", qty: 8 }, { name: "RES-330", qty: 20 }] },
  { id: "PCB-002", name: "Power Supply Unit", components: 8, qtyPerPcb: 1, carbon: 32.8, deps: [{ name: "TR-500", qty: 4 }, { name: "DIO-300", qty: 6 }, { name: "IND-50", qty: 2 }] },
  { id: "PCB-003", name: "LED Display Panel", components: 15, qtyPerPcb: 1, carbon: 28.5, deps: [{ name: "LED-12", qty: 24 }, { name: "RES-330", qty: 24 }, { name: "CON-22", qty: 1 }] },
  { id: "PCB-004", name: "Sensor Interface", components: 6, qtyPerPcb: 1, carbon: 18.9, deps: [{ name: "IC-2045", qty: 1 }, { name: "CAP-100", qty: 4 }, { name: "CON-22", qty: 2 }] },
];

const PCBListPage = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedPcb = pcbs.find((p) => p.id === selected);

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">PCB List</h1>
        <p className="text-sm text-muted-foreground">Board assemblies and component dependencies</p>
      </div>

      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">PCB ID</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Components</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Carbon/PCB (kg)</th>
            </tr>
          </thead>
          <tbody>
            {pcbs.map((p) => (
              <tr
                key={p.id}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
                className={`border-b border-border last:border-0 cursor-pointer transition-colors ${selected === p.id ? "bg-accent/50" : "hover:bg-muted/30"}`}
              >
                <td className="px-4 py-3 font-mono text-xs font-medium text-primary">{p.id}</td>
                <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-right">{p.components}</td>
                <td className="px-4 py-3 text-right">{p.carbon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPcb && (
        <div className="rounded-xl bg-card border border-border p-5 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground mb-4">{selectedPcb.name} — Component Breakdown</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              {selectedPcb.deps.map((d) => (
                <div key={d.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="font-mono text-xs text-primary">{d.name}</span>
                  <span className="text-sm text-muted-foreground">×{d.qty}</span>
                </div>
              ))}
            </div>
            <div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={selectedPcb.deps}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(140,15%,89%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(160,10%,45%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(160,10%,45%)" />
                  <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="qty" fill="hsl(152,55%,45%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PCBListPage;
