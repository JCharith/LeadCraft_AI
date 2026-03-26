type DashboardProps = {
  totalLeads: number;
  enrichedLeads: number;
  generatedEmails: number;
};

export default function Dashboard({
  totalLeads,
  enrichedLeads,
  generatedEmails,
}: DashboardProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
      }}
    >
      <StatCard title="Total Leads" value={totalLeads} />
      <StatCard title="Enriched Leads" value={enrichedLeads} />
      <StatCard title="Generated Emails" value={generatedEmails} />
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div
      style={{
        background: "#161b22",
        border: "1px solid #30363d",
        borderRadius: "16px",
        padding: "20px",
      }}
    >
      <p style={{ margin: 0, color: "#8b949e", fontSize: "14px" }}>{title}</p>
      <h2 style={{ margin: "10px 0 0 0", color: "#f0f6fc", fontSize: "28px" }}>{value}</h2>
    </div>
  );
}