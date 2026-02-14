import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";

const components = [
  { id: "IC-2045", name: "Integrated Circuit", warehouse: "WH-A", available: 450, reserved: 50, expiryStatus: "active" as const, expiryDate: "2026-08-15", shelfLife: "24 months", carbon: 12.5, supplier: "SUP-001", health: "healthy" as const },
  { id: "CAP-100", name: "Ceramic Capacitor", warehouse: "WH-B", available: 12, reserved: 8, expiryStatus: "low-stock" as const, expiryDate: "2026-05-20", shelfLife: "18 months", carbon: 3.2, supplier: "SUP-002", health: "warning" as const },
  { id: "RES-330", name: "Carbon Resistor", warehouse: "WH-A", available: 2400, reserved: 100, expiryStatus: "overstock" as const, expiryDate: "2027-01-10", shelfLife: "36 months", carbon: 1.1, supplier: "SUP-003", health: "healthy" as const },
  { id: "TR-500", name: "NPN Transistor", warehouse: "WH-C", available: 0, reserved: 0, expiryStatus: "dead-stock" as const, expiryDate: "2025-12-01", shelfLife: "12 months", carbon: 5.8, supplier: "SUP-004", health: "critical" as const },
  { id: "LED-12", name: "White LED 5mm", warehouse: "WH-A", available: 340, reserved: 60, expiryStatus: "active" as const, expiryDate: "2027-06-30", shelfLife: "48 months", carbon: 2.0, supplier: "SUP-005", health: "healthy" as const },
  { id: "IND-50", name: "Inductor 100uH", warehouse: "WH-B", available: 5, reserved: 3, expiryStatus: "expiring" as const, expiryDate: "2026-02-28", shelfLife: "12 months", carbon: 4.5, supplier: "SUP-006", health: "critical" as const },
  { id: "DIO-300", name: "Zener Diode", warehouse: "WH-A", available: 890, reserved: 20, expiryStatus: "active" as const, expiryDate: "2027-09-15", shelfLife: "36 months", carbon: 1.8, supplier: "SUP-007", health: "healthy" as const },
  { id: "CON-22", name: "USB-C Connector", warehouse: "WH-C", available: 18, reserved: 12, expiryStatus: "low-stock" as const, expiryDate: "2026-11-20", shelfLife: "24 months", carbon: 8.3, supplier: "SUP-008", health: "warning" as const },
];

const ComponentsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = components.filter((c) => {
    const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) || c.name.toLowerCase().includes(search.toLowerCase());
    const matchWH = warehouseFilter === "all" || c.warehouse === warehouseFilter;
    const matchStatus = statusFilter === "all" || c.expiryStatus === statusFilter;
    return matchSearch && matchWH && matchStatus;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Components</h1>
        <p className="text-sm text-muted-foreground">Manage inventory components and stock levels</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search components..."
            className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-colors"
          />
        </div>
        <select
          value={warehouseFilter}
          onChange={(e) => setWarehouseFilter(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="all">All Warehouses</option>
          <option value="WH-A">WH-A</option>
          <option value="WH-B">WH-B</option>
          <option value="WH-C">WH-C</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="low-stock">Low Stock</option>
          <option value="expiring">Expiring</option>
          <option value="dead-stock">Dead Stock</option>
          <option value="overstock">Overstock</option>
        </select>
      </div>

      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Part #</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Warehouse</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Available</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Reserved</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Expiry</th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">Carbon (kg)</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Supplier</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Health</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate(`/components/${c.id}`)}
                  className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs font-medium text-primary">{c.id}</td>
                  <td className="px-4 py-3 font-medium text-foreground">{c.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.warehouse}</td>
                  <td className="px-4 py-3 text-right font-medium">{c.available}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{c.reserved}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{c.expiryDate}</td>
                  <td className="px-4 py-3 text-right">{c.carbon}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{c.supplier}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.health} /></td>
                  <td className="px-4 py-3"><StatusBadge status={c.expiryStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage;
