import { FileSpreadsheet, Download } from "lucide-react";

const reports = [
  { title: "Components Report", description: "Full inventory with stock levels, expiry, and carbon data", filename: "components-report.xlsx" },
  { title: "Production Report", description: "Production history with quantities and batch details", filename: "production-report.xlsx" },
  { title: "Carbon Report", description: "Carbon footprint analysis across all components and productions", filename: "carbon-report.xlsx" },
];

const ExportPage = () => {
  const handleExport = (filename: string) => {
    // Simulated export
    alert(`Exporting ${filename}...`);
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Export Reports</h1>
        <p className="text-sm text-muted-foreground">Download Excel reports for offline analysis</p>
      </div>

      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.filename} className="rounded-xl bg-card border border-border p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleExport(r.filename)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExportPage;
