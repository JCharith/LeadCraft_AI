import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";
import type { Lead } from "../types/lead";

type LeadsPageProps = {
  leads: Lead[];
  onRefresh: () => void;
};

export default function Leads({ leads, onRefresh }: LeadsPageProps) {
  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <LeadForm onLeadCreated={onRefresh} />
      <LeadTable leads={leads} onRefresh={onRefresh} />
    </div>
  );
}