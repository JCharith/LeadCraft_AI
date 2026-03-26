import { useEffect, useMemo, useState } from "react";
import api from "./services/api";
import type { Lead } from "./types/lead";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await api.get<Lead[]>("/leads/");
      setLeads(response.data);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      alert("Failed to fetch leads from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const stats = useMemo(() => {
    const enrichedLeads = leads.filter(
      (lead) => lead.summary && lead.summary.trim() !== ""
    ).length;

    const generatedEmails = leads.filter(
      (lead) => lead.email_body && lead.email_body.trim() !== ""
    ).length;

    return {
      totalLeads: leads.length,
      enrichedLeads,
      generatedEmails,
    };
  }, [leads]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1117",
        color: "#f0f6fc",
        padding: "32px 20px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "24px",
        }}
      >
        <header>
          <h1 style={{ margin: 0, fontSize: "36px" }}>LeadCraft AI</h1>
          <p style={{ marginTop: "8px", color: "#8b949e", fontSize: "16px" }}>
            AI B2B Lead Finder + Enrichment + SDR Automation
          </p>
        </header>

        <Dashboard
          totalLeads={stats.totalLeads}
          enrichedLeads={stats.enrichedLeads}
          generatedEmails={stats.generatedEmails}
        />

        {loading ? (
          <div
            style={{
              background: "#161b22",
              border: "1px solid #30363d",
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            Loading leads...
          </div>
        ) : (
          <Leads leads={leads} onRefresh={fetchLeads} />
        )}
      </div>
    </div>
  );
}