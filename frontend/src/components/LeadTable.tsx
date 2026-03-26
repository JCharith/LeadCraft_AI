import type { Lead } from "../types/lead";
import api from "../services/api";

type LeadTableProps = {
  leads: Lead[];
  onRefresh: () => void;
};

export default function LeadTable({ leads, onRefresh }: LeadTableProps) {
  const handleEnrich = async (id: number) => {
    try {
      await api.post(`/enrich/${id}`);
      onRefresh();
    } catch (error) {
      console.error("Enrich failed:", error);
      alert("Failed to enrich lead.");
    }
  };

  const handleGenerate = async (id: number) => {
    try {
      await api.post(`/sdr/${id}`);
      onRefresh();
    } catch (error) {
      console.error("SDR generation failed:", error);
      alert("Failed to generate SDR email.");
    }
  };

  const handleSend = async (id: number) => {
    try {
      await api.post(`/send/${id}`);
      alert("Email sent successfully.");
      onRefresh();
    } catch (error) {
      console.error("Send failed:", error);
      alert("Failed to send email.");
    }
  };

  if (leads.length === 0) {
    return (
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Leads</h2>
        <p style={{ color: "#8b949e" }}>No leads available yet.</p>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <h2 style={sectionTitleStyle}>Leads</h2>

      <div style={{ display: "grid", gap: "16px" }}>
        {leads.map((lead) => (
          <div key={lead.id} style={leadCardStyle}>
            <div style={gridStyle}>
              <Info label="ID" value={String(lead.id)} />
              <Info label="Name" value={lead.name} />
              <Info label="Email" value={lead.email} />
              <Info label="Company" value={lead.company} />
              <Info label="Website" value={lead.website} />
            </div>

            <div style={{ marginTop: "12px" }}>
              <p style={labelStyle}>Summary</p>
              <div style={textBoxStyle}>{lead.summary || "Not enriched yet."}</div>
            </div>

            <div style={{ marginTop: "12px" }}>
              <p style={labelStyle}>Email Subject</p>
              <div style={textBoxStyle}>{lead.email_subject || "Not generated yet."}</div>
            </div>

            <div style={{ marginTop: "12px" }}>
              <p style={labelStyle}>Email Body</p>
              <div style={{ ...textBoxStyle, whiteSpace: "pre-wrap" }}>
                {lead.email_body || "Not generated yet."}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "16px" }}>
              <button onClick={() => handleEnrich(lead.id)} style={{ ...actionButtonStyle, background: "#1f6feb" }}>
                Enrich
              </button>
              <button onClick={() => handleGenerate(lead.id)} style={{ ...actionButtonStyle, background: "#8957e5" }}>
                Generate SDR
              </button>
              <button onClick={() => handleSend(lead.id)} style={{ ...actionButtonStyle, background: "#238636" }}>
                Send Email
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p style={labelStyle}>{label}</p>
      <div style={smallBoxStyle}>{value}</div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#161b22",
  border: "1px solid #30363d",
  borderRadius: "16px",
  padding: "20px",
};

const leadCardStyle: React.CSSProperties = {
  border: "1px solid #30363d",
  borderRadius: "14px",
  padding: "16px",
  background: "#0d1117",
};

const sectionTitleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "16px",
  color: "#f0f6fc",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "12px",
};

const labelStyle: React.CSSProperties = {
  margin: "0 0 6px 0",
  fontSize: "13px",
  fontWeight: 600,
  color: "#8b949e",
};

const smallBoxStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: "10px",
  background: "#161b22",
  border: "1px solid #30363d",
  color: "#f0f6fc",
};

const textBoxStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: "10px",
  background: "#161b22",
  border: "1px solid #30363d",
  color: "#f0f6fc",
  lineHeight: 1.5,
};

const actionButtonStyle: React.CSSProperties = {
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "10px 14px",
  cursor: "pointer",
  fontWeight: 600,
};