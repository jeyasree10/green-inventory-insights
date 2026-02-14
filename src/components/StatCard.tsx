import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  variant?: "default" | "success" | "warning" | "critical" | "info";
}

const variantStyles = {
  default: "border-border/60",
  success: "border-success/20 bg-[hsl(var(--success)/0.03)]",
  warning: "border-warning/20 bg-[hsl(var(--warning)/0.03)]",
  critical: "border-critical/20 bg-[hsl(var(--critical)/0.03)]",
  info: "border-info/20 bg-[hsl(var(--info)/0.03)]",
};

const iconStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  critical: "bg-critical/10 text-critical",
  info: "bg-info/10 text-info",
};

const StatCard = ({ title, value, subtitle, icon, trend, variant = "default" }: StatCardProps) => (
  <div className={`stat-card ${variantStyles[variant]}`}>
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        {trend && (
          <p className={`text-xs font-medium ${trend.positive ? "text-success" : "text-critical"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </p>
        )}
      </div>
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconStyles[variant]}`}>
        {icon}
      </div>
    </div>
  </div>
);

export default StatCard;
