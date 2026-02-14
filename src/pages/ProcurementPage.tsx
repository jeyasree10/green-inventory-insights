import { AlertTriangle, AlertCircle, Clock, TrendingUp } from "lucide-react";

const alerts = {
  critical: [
    { component: "CAP-100", stock: 12, threshold: 50, message: "Stock at 8% — immediate reorder needed" },
    { component: "IND-50", stock: 5, threshold: 30, message: "Stock at 5% — critical shortage" },
  ],
  warning: [
    { component: "CON-22", stock: 18, threshold: 50, message: "Stock at 36% — reorder soon" },
    { component: "TR-500", stock: 0, threshold: 40, message: "Out of stock — production blocked" },
  ],
  expiring: [
    { component: "IND-50", date: "2026-02-28", daysLeft: 14, message: "Expires in 14 days" },
    { component: "CAP-100", date: "2026-05-20", daysLeft: 95, message: "Expires in 95 days" },
  ],
  overstock: [
    { component: "RES-330", stock: 2400, optimal: 800, message: "300% above optimal — consider redistribution" },
    { component: "DIO-300", stock: 890, optimal: 400, message: "222% above optimal" },
  ],
};

const sectionConfig = [
  { key: "critical" as const, title: "Critical Stock (<20%)", icon: AlertCircle, color: "text-critical", bgColor: "bg-critical/5 border-critical/20" },
  { key: "warning" as const, title: "Warning (20–50%)", icon: AlertTriangle, color: "text-warning", bgColor: "bg-warning/5 border-warning/20" },
  { key: "expiring" as const, title: "Expiring Soon", icon: Clock, color: "text-warning", bgColor: "bg-warning/5 border-warning/20" },
  { key: "overstock" as const, title: "Overstock", icon: TrendingUp, color: "text-info", bgColor: "bg-info/5 border-info/20" },
];

const ProcurementPage = () => (
  <div className="space-y-5 animate-fade-in">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Procurement Intelligence</h1>
      <p className="text-sm text-muted-foreground">Actionable stock alerts and reorder recommendations</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {sectionConfig.map(({ key, title, icon: Icon, color, bgColor }) => (
        <div key={key} className={`rounded-xl border p-5 ${bgColor}`}>
          <div className="flex items-center gap-2 mb-4">
            <Icon className={`h-5 w-5 ${color}`} />
            <h3 className={`text-sm font-semibold ${color}`}>{title}</h3>
            <span className={`ml-auto text-xs font-bold ${color}`}>{alerts[key].length}</span>
          </div>
          <div className="space-y-2">
            {alerts[key].map((a, i) => (
              <div key={i} className="rounded-lg bg-card border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-medium text-primary">{a.component}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{a.message}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ProcurementPage;
