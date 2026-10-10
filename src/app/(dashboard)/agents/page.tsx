"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  FaUserTie,
  FaPhoneAlt,
  FaTrash,
  FaSearch,
  FaSpinner,
  FaEye,
  FaTimes,
  FaWhatsapp,
  FaWallet,
  FaBuilding,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserFriends,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { getAllAgents, deleteAgent } from "@/lib/serviceapi/agent/api";
import type { Agent } from "@/types/agent.type";

export default function AgentPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Agent | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllAgents();
      setAgents(data);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to load agents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isPending) return;

    const role = (session?.user as { role?: string } | undefined)?.role;

    if (!session || role !== "admin") {
      toast.error("Shudhu Admin ei page dekhte pare");
      router.replace("/dashboard");
      return;
    }

    fetchAgents();
  }, [session, isPending, router, fetchAgents]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" agent delete korbe? Ei kaj undo kora jabe na.`)) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteAgent(id);
      setAgents((prev) => prev.filter((a) => a.id !== id));
      if (selected?.id === id) setSelected(null);
      toast.success("Agent deleted successfully");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = agents.filter((a) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      a.name.toLowerCase().includes(q) ||
      a.mobileNo.includes(q) ||
      a.fathersName?.toLowerCase().includes(q) ||
      (a as any).user?.email?.toLowerCase().includes(q)
    );
  });

  if (isPending || loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center gap-3 text-slate-500">
        <FaSpinner className="h-5 w-5 animate-spin text-emerald-600" />
        Loading agents...
      </div>
    );
  }

  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session || role !== "admin") return null;

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">All Agents</h1>
          <p className="mt-1 text-sm text-slate-500">
            Total: {agents.length} agent
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name / mobile / email search..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-16 text-center text-slate-500">
          <FaUserTie className="mx-auto mb-3 h-10 w-10 text-slate-300" />
          <p className="font-medium">
            {search ? "Kono agent paowa jay nai" : "Ekhono kono agent nei"}
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">Agent</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">WhatsApp</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((agent) => (
                  <tr
                    key={agent.id}
                    className="transition hover:bg-emerald-50/40"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-emerald-100">
                          {agent.photo ? (
                            <Image
                              src={agent.photo}
                              alt={agent.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-emerald-600">
                              <FaUserTie className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">
                            {agent.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {agent.fathersName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {agent.mobileNo}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {agent.whatsAppNumber || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {(agent as any).user?.email || "—"}
                    </td>
                    <td className="max-w-[180px] truncate px-4 py-3 text-slate-500">
                      {agent.presentAddress}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelected(agent)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                        >
                          <FaEye className="h-3 w-3" />
                          View
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === agent.id}
                          onClick={() => handleDelete(agent.id, agent.name)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                        >
                          {deletingId === agent.id ? (
                            <FaSpinner className="h-3 w-3 animate-spin" />
                          ) : (
                            <FaTrash className="h-3 w-3" />
                          )}
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal — সব field */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">
                Agent Details
              </h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6 p-6">
              {/* Photo + Name */}
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-emerald-100">
                  {selected.photo ? (
                    <Image
                      src={selected.photo}
                      alt={selected.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-emerald-600">
                      <FaUserTie className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selected.name}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Father: {selected.fathersName}
                  </p>
                </div>
              </div>

              {/* Personal */}
              <Section title="Personal Information">
                <Field label="Name" value={selected.name} />
                <Field label="Father's Name" value={selected.fathersName} />
                <Field
                  label="Mobile No"
                  value={selected.mobileNo}
                  icon={<FaPhoneAlt className="text-emerald-500" />}
                />
                <Field
                  label="WhatsApp Number"
                  value={selected.whatsAppNumber}
                  icon={<FaWhatsapp className="text-emerald-500" />}
                />
              </Section>

              {/* Payment */}
              <Section title="Payment / Bank Details">
                <Field
                  label="Bkash Number"
                  value={selected.bkashNumber}
                  icon={<FaWallet className="text-amber-500" />}
                />
                <Field
                  label="Bank Account Number"
                  value={selected.bankAccountNumber}
                  icon={<FaBuilding className="text-emerald-500" />}
                />
              </Section>

              {/* Account */}
              <Section title="Account Credentials">
                <Field
                  label="Email"
                  value={(selected as any).user?.email}
                  icon={<FaEnvelope className="text-amber-500" />}
                />
              </Section>

              {/* Address */}
              <Section title="Address">
                <Field
                  label="Present Address"
                  value={selected.presentAddress}
                  icon={<FaMapMarkerAlt className="text-amber-500" />}
                  full
                />
                <Field
                  label="Permanent Address"
                  value={selected.permanentAddress}
                  icon={<FaMapMarkerAlt className="text-amber-500" />}
                  full
                />
              </Section>

              {/* Emergency */}
              <Section title="Emergency Contact Details">
                <Field
                  label="Name"
                  value={selected.emergencyName}
                  icon={<FaUserFriends className="text-emerald-500" />}
                />
                <Field label="Relation" value={selected.emergencyRelation} />
                <Field
                  label="Mobile No"
                  value={selected.emergencyMobile}
                  icon={<FaPhoneAlt className="text-emerald-500" />}
                />
                <Field
                  label="Address"
                  value={selected.emergencyAddress}
                  full
                />
              </Section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Small helpers ---------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
      <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
        {title}
      </h4>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  icon,
  full,
}: {
  label: string;
  value?: string | null;
  icon?: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="flex items-center gap-2 text-sm font-medium text-slate-800">
        {icon}
        {value || "—"}
      </p>
    </div>
  );
}