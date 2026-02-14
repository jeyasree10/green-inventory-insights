import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";

const history = [
  { id: "PROD-001", pcb: "Main Control Board", qty: 50, carbon: 2260, supplier: "SUP-001", date: "2026-02-12", status: "active" as const },
  { id: "PROD-002", pcb: "LED Display Panel", qty: 30, carbon: 855, supplier: "SUP-005", date: "2026-02-10", status: "active" as const },
  { id: "PROD-003", pcb: "Power Supply Unit", qty: 20, carbon: 656, supplier: "SUP-004", date: "2026-02-08", status: "blocked" as const },
  { id: "PROD-004", pcb: "Sensor Interface", qty: 100, carbon: 1890, supplier: "SUP-001", date: "2026-02-05", status: "active" as const },
  { id: "PROD-005", pcb: "Main Control Board", qty: 25, carbon: 1130, supplier: "SUP-002", date: "2026-01-28", status: "active" as const },
  { id: "PROD-006", pcb: "LED Display Panel", qty: 40, carbon: 1140, supplier: "SUP-005", date: "2026-01-20", status: "active" as const },
];

const ProductionHistoryPage = () => {
  const [pcbFilter, setPcbFilter] = useState("all");
  const filtered = history.filter((h) => pcbFilter === "all" || h.pcb === pcbFilter);

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Production History</h1>
        <p className="text-sm text-muted-foreground">Past production runs and carbon footprint records</p>
      </div>

      <div className="flex gap-3">
        <select
          value={pcbFilter}
          onChange={(e) => setPcbFilter(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="all">All PCBs</option>
          <option value="Main Control Board">Main Control Board</option>
          <option value="Power Supply Unit">Power Supply Unit</option>
          <option value="LED Display Panel">LED Display Panel</option>
          <option value="Sensor Interface">Sensor Interface</option>
        </select>
      </div>

      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Production ID</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">PCB</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Qty</th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">Carbon (kg)</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Supplier</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h) => (
              <tr key={h.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs font-medium text-primary">{h.id}</td>
                <td className="px-4 py-3 font-medium text-foreground">{h.pcb}</td>
                <td className="px-4 py-3 text-right">{h.qty}</td>
                <td className="px-4 py-3 text-right">{h.carbon}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{h.supplier}</td>
                <td className="px-4 py-3 text-muted-foreground text-xs">{h.date}</td>
                <td className="px-4 py-3"><StatusBadge status={h.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductionHistoryPage;
