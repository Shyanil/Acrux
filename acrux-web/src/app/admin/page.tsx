"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Lock,
  Mail,
  Search,
  Download,
  Filter,
  Phone,
  MessageCircle,
  Eye,
  Trash2,
  CheckCircle2,
  Calendar,
  Users,
  Compass,
  ArrowUpRight,
  Database,
  RefreshCw,
  LogOut,
  X,
  FileSpreadsheet,
  Layers,
  ChevronDown
} from "lucide-react";
import "./admin.css";
import { Lead, LeadStats, LeadStatus } from "@/types/leads";
import {
  fetchLeadsClient,
  updateLeadStatusClient,
  deleteLeadClient,
  downloadLeadsCsvClient,
} from "@/lib/leads-client";

const DEFAULT_ADMIN_EMAIL = "admin@acruxrealcon.in";
const DEFAULT_ADMIN_PASS = "acrux2026";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authEmail, setAuthEmail] = useState<string>("");
  const [authPassword, setAuthPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterSource, setFilterSource] = useState<string>("all");
  const [filterResidence, setFilterResidence] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("all");

  // Selected lead for detail modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leadNoteInput, setLeadNoteInput] = useState<string>("");
  const [isSavingNote, setIsSavingNote] = useState<boolean>(false);

  // Supabase modal
  const [showDbModal, setShowDbModal] = useState<boolean>(false);

  // Check existing session
  useEffect(() => {
    const session = sessionStorage.getItem("acrux_admin_session");
    if (session === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLeadsClient();
      setLeads(data.leads || []);
      setStats(data.stats || null);
      setIsSupabaseConnected(Boolean(data.isSupabaseConnected));
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (
      (authEmail.toLowerCase().trim() === DEFAULT_ADMIN_EMAIL || authEmail.toLowerCase().trim() === "admin") &&
      authPassword === DEFAULT_ADMIN_PASS
    ) {
      sessionStorage.setItem("acrux_admin_session", "true");
      setIsAuthenticated(true);
    } else {
      setLoginError("Invalid credentials. Try: admin@acruxrealcon.in / acrux2026");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("acrux_admin_session");
    setIsAuthenticated(false);
  };

  // Status Change
  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await updateLeadStatusClient(id, { status: newStatus });
      if (res.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
        if (selectedLead?.id === id) {
          setSelectedLead((curr) => (curr ? { ...curr, status: newStatus } : null));
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Save Note
  const handleSaveNote = async () => {
    if (!selectedLead) return;
    setIsSavingNote(true);
    try {
      const res = await updateLeadStatusClient(selectedLead.id, { notes: leadNoteInput });
      if (res.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: leadNoteInput } : l))
        );
        setSelectedLead((curr) => (curr ? { ...curr, notes: leadNoteInput } : null));
      }
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Delete Lead
  const handleDeleteLead = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete lead: ${name}?`)) return;
    try {
      const res = await deleteLeadClient(id);
      if (res.success) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    let result = [...leads];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          (l.email && l.email.toLowerCase().includes(q)) ||
          (l.notes && l.notes.toLowerCase().includes(q)) ||
          (l.utm_source && l.utm_source.toLowerCase().includes(q))
      );
    }

    if (filterSource !== "all") {
      result = result.filter((l) => (l.utm_source || "").toLowerCase() === filterSource.toLowerCase());
    }

    if (filterResidence !== "all") {
      result = result.filter((l) => l.residence === filterResidence);
    }

    if (filterStatus !== "all") {
      result = result.filter((l) => l.status === filterStatus);
    }

    if (filterDate !== "all") {
      const now = new Date();
      result = result.filter((l) => {
        const leadDate = new Date(l.createdAt);
        const diffDays = (now.getTime() - leadDate.getTime()) / (1000 * 60 * 60 * 24);
        if (filterDate === "today") return diffDays <= 1;
        if (filterDate === "week") return diffDays <= 7;
        if (filterDate === "month") return diffDays <= 30;
        return true;
      });
    }

    return result;
  }, [leads, searchQuery, filterSource, filterResidence, filterStatus, filterDate]);

  // Unique sources for dropdown
  const uniqueSources = useMemo(() => {
    const set = new Set<string>();
    leads.forEach((l) => {
      if (l.utm_source) set.add(l.utm_source.toLowerCase());
    });
    return Array.from(set);
  }, [leads]);

  // Format Helper
  const formatDateTime = (iso: string) => {
    try {
      const d = new Date(iso);
      return {
        date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        time: d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      };
    } catch {
      return { date: iso, time: "" };
    }
  };

  const getSourceBadgeClass = (source?: string) => {
    const s = (source || "").toLowerCase();
    if (s.includes("google")) return "google";
    if (s.includes("facebook") || s.includes("meta")) return "facebook";
    if (s.includes("instagram")) return "instagram";
    if (s.includes("direct")) return "direct";
    return "other";
  };

  // 1. Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="admin-body-wrap">
        <main className="admin-login-stage">
          <div className="admin-login-backdrop-glow" />
          <div className="admin-login-card">
            <div className="login-card-header">
              <div className="login-brand-logo">
                <Image
                  src="/assets/Aakaar Logo.webp"
                  alt="Acrux Aakaar"
                  width={150}
                  height={62}
                  priority
                />
              </div>
              <h1>Concierge &amp; Lead Portal</h1>
              <p>Private Sales Administration</p>
            </div>

            <form className="login-card-body" onSubmit={handleLogin}>
              {loginError && <div className="login-error-msg">{loginError}</div>}

              <div className="login-field">
                <label htmlFor="adm-email">Admin Email Address</label>
                <div className="login-input-wrap">
                  <Mail size={16} className="login-input-icon" />
                  <input
                    id="adm-email"
                    type="text"
                    className="login-input"
                    placeholder="admin@acruxrealcon.in"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="adm-pass">Security Password</label>
                <div className="login-input-wrap">
                  <Lock size={16} className="login-input-icon" />
                  <input
                    id="adm-pass"
                    type="password"
                    className="login-input"
                    placeholder="Enter password"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="login-submit-btn">
                <span>Access Lead Portal</span>
                <ArrowUpRight size={15} />
              </button>

              <div className="login-card-footer">
                <span>Default Passcode: <strong>admin@acruxrealcon.in</strong> / <strong>acrux2026</strong></span>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  // 2. Render Full Luxury Admin CRM Dashboard
  return (
    <div className="admin-body-wrap">
      {/* Top Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-brand">
            <div className="admin-header-logo">
              <Image
                src="/assets/Aakaar Logo.webp"
                alt="Acrux Aakaar"
                width={130}
                height={52}
                priority
              />
            </div>
            <div className="admin-header-badge">
              <span className="portal-tag">LEAD CONCIERGE &amp; CRM</span>
            </div>
          </div>

          <div className="admin-header-actions">
            {/* Supabase status badge */}
            <button
              type="button"
              className={`supabase-status-pill ${isSupabaseConnected ? "connected" : "local-ready"}`}
              onClick={() => setShowDbModal(true)}
              title="Click to check database credentials and integration"
            >
              <span className="status-dot-pulse" />
              <span>{isSupabaseConnected ? "Supabase Live" : "Local Storage (Ready for Supabase)"}</span>
              <Database size={12} />
            </button>

            {/* CSV Download Button */}
            <button
              type="button"
              onClick={() => downloadLeadsCsvClient(filteredLeads)}
              className="admin-btn-export"
              title="Download filtered leads as CSV file"
            >
              <Download size={13} />
              <span>Download CSV</span>
            </button>

            {/* Logout */}
            <button type="button" onClick={handleLogout} className="admin-btn-logout">
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="admin-main-container">
        {/* KPI Stats Grid */}
        <section className="admin-stats-grid" aria-label="Key Performance Indicators">
          <div className="admin-stat-card">
            <div className="stat-card-top">
              <span className="stat-card-title">Total Enquiries</span>
              <Users size={17} className="stat-card-icon" />
            </div>
            <div className="stat-card-val">{stats?.totalLeads ?? leads.length}</div>
            <span className="stat-card-sub">All-time captured leads</span>
          </div>

          <div className="admin-stat-card">
            <div className="stat-card-top">
              <span className="stat-card-title">Today's Leads</span>
              <Calendar size={17} className="stat-card-icon" />
            </div>
            <div className="stat-card-val">{stats?.todayLeads ?? 0}</div>
            <span className="stat-card-sub">Enquiries received today</span>
          </div>

          <div className="admin-stat-card">
            <div className="stat-card-top">
              <span className="stat-card-title">Walkthroughs Scheduled</span>
              <Compass size={17} className="stat-card-icon" />
            </div>
            <div className="stat-card-val">{stats?.scheduledVisits ?? 0}</div>
            <span className="stat-card-sub">Private previews booked</span>
          </div>

          <div className="admin-stat-card">
            <div className="stat-card-top">
              <span className="stat-card-title">Top UTM Channel</span>
              <Layers size={17} className="stat-card-icon" />
            </div>
            <div className="stat-card-val" style={{ fontSize: "24px", textTransform: "capitalize" }}>
              {stats?.topSource || "Direct"}
            </div>
            <span className="stat-card-sub">Most active acquisition source</span>
          </div>
        </section>

        {/* Filter Toolbar */}
        <section className="admin-toolbar-card" aria-label="Lead Filters">
          <div className="admin-toolbar-row">
            <div className="admin-search-wrap">
              <Search size={15} className="admin-search-icon" />
              <input
                type="text"
                className="admin-search-input"
                placeholder="Search by customer name, phone, email, or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="admin-filter-group">
              {/* Filter by UTM Source */}
              <select
                className="admin-select"
                value={filterSource}
                onChange={(e) => setFilterSource(e.target.value)}
                aria-label="Filter by UTM source"
              >
                <option value="all">All UTM Sources ({uniqueSources.length})</option>
                {uniqueSources.map((s) => (
                  <option key={s} value={s}>
                    Source: {s.toUpperCase()}
                  </option>
                ))}
              </select>

              {/* Filter by Residence */}
              <select
                className="admin-select"
                value={filterResidence}
                onChange={(e) => setFilterResidence(e.target.value)}
                aria-label="Filter by residence configuration"
              >
                <option value="all">All Residences</option>
                <option value="2.5 BHK">2.5 BHK (1,790 Sq. Ft.)</option>
                <option value="3 BHK">3 BHK (2,148 Sq. Ft.)</option>
                <option value="Both Options">Both Options</option>
              </select>

              {/* Filter by Status */}
              <select
                className="admin-select"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                aria-label="Filter by lead status"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="visit_scheduled">Visit Scheduled</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Booked / Won</option>
                <option value="lost">Lost</option>
              </select>

              {/* Filter by Date */}
              <select
                className="admin-select"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                aria-label="Filter by date range"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Past 7 Days</option>
                <option value="month">Past 30 Days</option>
              </select>

              {(searchQuery || filterSource !== "all" || filterResidence !== "all" || filterStatus !== "all" || filterDate !== "all") && (
                <button
                  type="button"
                  className="admin-btn-reset"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterSource("all");
                    setFilterResidence("all");
                    setFilterStatus("all");
                    setFilterDate("all");
                  }}
                >
                  Reset Filters
                </button>
              )}

              <button
                type="button"
                className="admin-btn-reset"
                onClick={fetchLeads}
                title="Refresh leads list"
              >
                <RefreshCw size={13} />
              </button>
            </div>
          </div>
        </section>

        {/* Data Table */}
        <section className="admin-table-card">
          <div className="admin-table-wrapper">
            <table className="leads-table">
              <thead>
                <tr>
                  <th>Date &amp; Time</th>
                  <th>Customer Information</th>
                  <th>Residence Interest</th>
                  <th>Preferred Timing</th>
                  <th>UTM Source / Channel</th>
                  <th>Lead Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>
                      Loading lead database...
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#666" }}>
                      No leads match the specified filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => {
                    const dt = formatDateTime(lead.createdAt);
                    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");

                    return (
                      <tr key={lead.id}>
                        {/* Date & Time */}
                        <td style={{ whiteSpace: "nowrap" }}>
                          <strong style={{ display: "block", color: "var(--adm-navy)" }}>{dt.date}</strong>
                          <span style={{ fontSize: "11px", color: "var(--adm-muted)" }}>{dt.time}</span>
                        </td>

                        {/* Customer Information */}
                        <td>
                          <div className="lead-name-cell">
                            <span className="lead-customer-name">{lead.name}</span>
                            <div className="lead-contact-line">
                              <a href={`tel:${lead.phone}`} className="lead-phone-link">
                                {lead.phone}
                              </a>
                              {lead.email && <span className="lead-email-sub">{lead.email}</span>}
                            </div>
                          </div>
                        </td>

                        {/* Residence Interest */}
                        <td>
                          <span className="residence-chip">{lead.residence}</span>
                        </td>

                        {/* Preferred Timing */}
                        <td>
                          <span style={{ fontSize: "11.5px", color: "#444" }}>
                            {lead.timeSlot || "Standard Schedule"}
                          </span>
                        </td>

                        {/* UTM Attribution */}
                        <td>
                          <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                            <span className={`utm-badge ${getSourceBadgeClass(lead.utm_source)}`}>
                              {lead.utm_source || "direct"}
                            </span>
                            {lead.utm_medium && lead.utm_medium !== "none" && (
                              <span style={{ fontSize: "10px", color: "#777" }}>
                                {lead.utm_medium} {lead.utm_campaign ? `· ${lead.utm_campaign}` : ""}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Status Dropdown */}
                        <td>
                          <div className="status-select-wrap">
                            <select
                              value={lead.status}
                              className={`status-${lead.status}`}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="visit_scheduled">Visit Scheduled</option>
                              <option value="negotiation">Negotiation</option>
                              <option value="won">Booked</option>
                              <option value="lost">Lost</option>
                            </select>
                          </div>
                        </td>

                        {/* Action Buttons */}
                        <td>
                          <div className="table-actions-cell">
                            {/* WhatsApp Direct */}
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                `Hello ${lead.name}, thank you for your interest in Acrux Aakaar (Patia, Bhubaneswar). This is the Acrux sales concierge following up on your ${lead.residence} enquiry.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="action-icon-btn whatsapp"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle size={15} />
                            </a>

                            {/* Direct Call */}
                            <a
                              href={`tel:${lead.phone}`}
                              className="action-icon-btn"
                              title="Call customer directly"
                            >
                              <Phone size={14} />
                            </a>

                            {/* View Details */}
                            <button
                              type="button"
                              className="action-icon-btn"
                              title="View complete lead attribution & notes"
                              onClick={() => {
                                setSelectedLead(lead);
                                setLeadNoteInput(lead.notes || "");
                              }}
                            >
                              <Eye size={14} />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              className="action-icon-btn delete"
                              title="Delete Lead"
                              onClick={() => handleDeleteLead(lead.id, lead.name)}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* 3. Lead Detail Modal */}
      {selectedLead && (
        <div
          className="lead-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedLead(null);
          }}
        >
          <div className="lead-modal-card">
            <div className="lead-modal-header">
              <div>
                <h3>{selectedLead.name}</h3>
                <p>
                  Enquiry ID: {selectedLead.id} · Registered {formatDateTime(selectedLead.createdAt).date}
                </p>
              </div>
              <button
                type="button"
                className="lead-modal-close"
                onClick={() => setSelectedLead(null)}
                aria-label="Close lead detail"
              >
                <X size={16} />
              </button>
            </div>

            <div className="lead-modal-body">
              {/* Contact Information */}
              <div>
                <span className="lead-detail-section-title">CONTACT INFORMATION</span>
                <div className="lead-utm-grid">
                  <div className="utm-item">
                    <span className="utm-key">Phone Number</span>
                    <span className="utm-val">{selectedLead.phone}</span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">Email Address</span>
                    <span className="utm-val">{selectedLead.email || "Not Provided"}</span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">Residence Preference</span>
                    <span className="utm-val">{selectedLead.residence}</span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">Preferred Walkthrough</span>
                    <span className="utm-val">{selectedLead.timeSlot || "Standard Schedule"}</span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">Form Captured From</span>
                    <span className="utm-val" style={{ textTransform: "capitalize" }}>
                      {selectedLead.sourceForm?.replace("_", " ")}
                    </span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">Lead Status</span>
                    <span className="utm-val" style={{ textTransform: "uppercase" }}>
                      {selectedLead.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* UTM Source Attribution */}
              <div>
                <span className="lead-detail-section-title">MARKETING &amp; UTM SOURCE ATTRIBUTION</span>
                <div className="lead-utm-grid">
                  <div className="utm-item">
                    <span className="utm-key">UTM Source</span>
                    <span className="utm-val">{selectedLead.utm_source || "direct"}</span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">UTM Medium</span>
                    <span className="utm-val">{selectedLead.utm_medium || "none"}</span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">UTM Campaign</span>
                    <span className="utm-val">{selectedLead.utm_campaign || "none"}</span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">UTM Term / Keyword</span>
                    <span className="utm-val">{selectedLead.utm_term || "none"}</span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">UTM Content</span>
                    <span className="utm-val">{selectedLead.utm_content || "none"}</span>
                  </div>
                  <div className="utm-item">
                    <span className="utm-key">Referrer URL</span>
                    <span className="utm-val">{selectedLead.referrer || "Direct Navigation"}</span>
                  </div>
                </div>
              </div>

              {/* Internal Sales Notes */}
              <div>
                <span className="lead-detail-section-title">INTERNAL SALES NOTES</span>
                <textarea
                  rows={3}
                  className="login-input"
                  style={{ padding: "10px 14px", resize: "vertical" }}
                  placeholder="Add notes about customer budget, discussion points, site visit timings, or unit preferences..."
                  value={leadNoteInput}
                  onChange={(e) => setLeadNoteInput(e.target.value)}
                />
                <button
                  type="button"
                  className="admin-btn-export"
                  style={{ marginTop: "10px", width: "auto" }}
                  onClick={handleSaveNote}
                  disabled={isSavingNote}
                >
                  {isSavingNote ? "Saving Note..." : "Save Internal Note"}
                </button>
              </div>

              {/* Quick Contact Actions */}
              <div className="lead-modal-actions">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${selectedLead.name}, this is Acrux Realcon sales desk regarding your interest in Acrux Aakaar.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lead-modal-btn whatsapp"
                >
                  <MessageCircle size={15} />
                  <span>Open WhatsApp Chat</span>
                </a>

                <a href={`tel:${selectedLead.phone}`} className="lead-modal-btn call">
                  <Phone size={15} />
                  <span>Call {selectedLead.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Supabase Setup Modal */}
      {showDbModal && (
        <div
          className="lead-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDbModal(false);
          }}
        >
          <div className="lead-modal-card" style={{ maxWidth: "600px" }}>
            <div className="lead-modal-header">
              <div>
                <h3>Supabase Database Integration</h3>
                <p>Connect your cloud PostgreSQL database</p>
              </div>
              <button
                type="button"
                className="lead-modal-close"
                onClick={() => setShowDbModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="lead-modal-body">
              <div style={{ background: isSupabaseConnected ? "#F0FDF4" : "#FEF3C7", padding: "14px 18px", borderLeft: `4px solid ${isSupabaseConnected ? "#22C55E" : "#F59E0B"}` }}>
                <strong style={{ color: isSupabaseConnected ? "#15803D" : "#B45309" }}>
                  {isSupabaseConnected ? "● Supabase is currently connected and active." : "● Operating in Local Active Mode."}
                </strong>
                <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#333" }}>
                  {isSupabaseConnected
                    ? "All leads submitted on the website are being synced directly to your cloud Supabase database."
                    : "Leads are currently being captured and stored securely in local server storage. When you provide your Supabase credentials, the system will automatically sync with Supabase!"}
                </p>
              </div>

              <div>
                <span className="lead-detail-section-title">HOW TO CONNECT SUPABASE:</span>
                <ol style={{ fontSize: "12.5px", lineHeight: "1.7", color: "#333", paddingLeft: "20px", margin: "0" }}>
                  <li>Create a free project at <strong>supabase.com</strong>.</li>
                  <li>Go to <strong>Project Settings -&gt; API</strong> and copy your Project URL and API Keys.</li>
                  <li>
                    Add these two lines to your <code style={{ background: "#eee", padding: "2px 5px" }}>acrux-web/.env.local</code> file:
                    <pre style={{ background: "#102038", color: "#F7F5F0", padding: "10px", borderRadius: "3px", overflowX: "auto", margin: "8px 0" }}>
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}
                    </pre>
                  </li>
                  <li>
                    Execute the pre-built schema script <code style={{ background: "#eee", padding: "2px 5px" }}>supabase_schema.sql</code> in the Supabase SQL editor.
                  </li>
                </ol>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  className="admin-btn-export"
                  onClick={() => {
                    fetchLeads();
                    setShowDbModal(false);
                  }}
                >
                  Refresh &amp; Check Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
