import { useState } from "react";
import api from "../services/api";

type LeadFormProps = {
  onLeadCreated: () => void;
};

type LeadFormState = {
  name: string;
  email: string;
  company: string;
  website: string;
};

const initialForm: LeadFormState = {
  name: "",
  email: "",
  company: "",
  website: "",
};

export default function LeadForm({ onLeadCreated }: LeadFormProps) {
  const [form, setForm] = useState<LeadFormState>(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await api.post("/leads/", form);
      setForm(initialForm);
      onLeadCreated();
      alert("Lead created successfully.");
    } catch (error) {
      console.error("Create lead failed:", error);
      alert("Failed to create lead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>Create Lead</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
        }}
      >
        <input type="text" name="name" placeholder="Lead name" value={form.name} onChange={handleChange} required style={inputStyle} />
        <input type="email" name="email" placeholder="Lead email" value={form.email} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="company" placeholder="Company name" value={form.company} onChange={handleChange} required style={inputStyle} />
        <input type="text" name="website" placeholder="Website" value={form.website} onChange={handleChange} required style={inputStyle} />

        <div style={{ gridColumn: "1 / -1" }}>
          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Creating..." : "Create Lead"}
          </button>
        </div>
      </form>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: "#161b22",
  border: "1px solid #30363d",
  borderRadius: "16px",
  padding: "20px",
};

const titleStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: "16px",
  color: "#f0f6fc",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #30363d",
  background: "#0d1117",
  color: "#f0f6fc",
  outline: "none",
};

const buttonStyle: React.CSSProperties = {
  background: "#238636",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  padding: "12px 18px",
  cursor: "pointer",
  fontWeight: 600,
};