interface StatusBadgeProps {
  status: "active" | "expired" | "blocked" | "low-stock" | "overstock" | "expiring" | "dead-stock" | "critical" | "warning" | "healthy";
  label?: string;
}

const statusConfig: Record<string, { className: string; defaultLabel: string }> = {
  active: { className: "badge-success", defaultLabel: "Active" },
  healthy: { className: "badge-success", defaultLabel: "Healthy" },
  expired: { className: "badge-critical", defaultLabel: "Expired" },
  blocked: { className: "badge-critical", defaultLabel: "Blocked" },
  "low-stock": { className: "badge-warning", defaultLabel: "Low Stock" },
  "dead-stock": { className: "badge-critical", defaultLabel: "Dead Stock" },
  overstock: { className: "badge-info", defaultLabel: "Overstock" },
  expiring: { className: "badge-warning", defaultLabel: "Expiring Soon" },
  critical: { className: "badge-critical", defaultLabel: "Critical" },
  warning: { className: "badge-warning", defaultLabel: "Warning" },
};

const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.active;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
      {label || config.defaultLabel}
    </span>
  );
};

export default StatusBadge;
