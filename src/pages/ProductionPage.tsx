import { useState } from "react";
import { AlertTriangle, CheckCircle, Lock } from "lucide-react";

const pcbOptions = [
  { id: "PCB-001", name: "Main Control Board", components: [{ name: "IC-2045", required: 2, available: 450 }, { name: "CAP-100", required: 8, available: 12 }, { name: "RES-330", required: 20, available: 2400 }] },
  { id: "PCB-002", name: "Power Supply Unit", components: [{ name: "TR-500", required: 4, available: 0 }, { name: "DIO-300", required: 6, available: 890 }, { name: "IND-50", required: 2, available: 5 }] },
  { id: "PCB-003", name: "LED Display Panel", components: [{ name: "LED-12", required: 24, available: 340 }, { name: "RES-330", required: 24, available: 2400 }, { name: "CON-22", required: 1, available: 18 }] },
];

const ProductionPage = () => {
  const [selectedPcb, setSelectedPcb] = useState("");
  const [quantity, setQuantity] = useState("");
  const [batchId, setBatchId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const pcb = pcbOptions.find((p) => p.id === selectedPcb);
  const qty = parseInt(quantity) || 0;

  const stockPreview = pcb?.components.map((c) => ({
    ...c,
    needed: c.required * qty,
    sufficient: c.available >= c.required * qty,
  }));

  const allSufficient = stockPreview?.every((s) => s.sufficient) ?? false;
  const isLocked = selectedPcb === "PCB-002"; // simulate lock

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allSufficient || isLocked) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-5 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Production</h1>
        <p className="text-sm text-muted-foreground">Submit production orders and manage stock deductions</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-card border border-border p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">PCB Name</label>
            <select
              value={selectedPcb}
              onChange={(e) => setSelectedPcb(e.target.value)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
            >
              <option value="">Select PCB</option>
              {pcbOptions.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
              min="1"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Batch ID</label>
            <input
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              placeholder="BATCH-001"
              className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>

        {isLocked && (
          <div className="flex items-center gap-2 rounded-lg bg-warning/10 border border-warning/20 px-4 py-3 text-sm text-warning">
            <Lock className="h-4 w-4 shrink-0" />
            <span>This PCB is currently locked by another production session.</span>
          </div>
        )}

        {stockPreview && qty > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Stock Availability</p>
            {stockPreview.map((s) => (
              <div key={s.name} className={`flex items-center justify-between rounded-lg border p-3 ${s.sufficient ? "border-success/20 bg-success/5" : "border-critical/20 bg-critical/5"}`}>
                <div className="flex items-center gap-2">
                  {s.sufficient ? <CheckCircle className="h-4 w-4 text-success" /> : <AlertTriangle className="h-4 w-4 text-critical" />}
                  <span className="font-mono text-xs">{s.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">Need {s.needed} / Available {s.available}</span>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={!allSufficient || isLocked || qty <= 0 || !batchId}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitted ? "✓ Production Submitted" : "Submit Production"}
        </button>
      </form>
    </div>
  );
};

export default ProductionPage;
