import React, { useState } from 'react';
import {
  ClipboardList,
  SearchCheck,
  FileSpreadsheet,
  CalendarClock,
  Camera,
  Receipt,
  BarChart3,
  CheckCircle2,
  Plus,
  Send,
  Printer,
  UserCheck,
  ArrowUpRight,
  Clock,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import {
  CrmTab,
  Enquiry,
  EnquiryStatus,
  SiteInspection,
  Quotation,
  ServiceJob,
  InvoiceRecord,
} from '../types';

interface TeamDashboardProps {
  activeTab: CrmTab;
  setActiveTab: (tab: CrmTab) => void;
  enquiries: Enquiry[];
  onAdvanceEnquiryStatus: (id: string) => void;
  inspections: SiteInspection[];
  onAddInspection: (inspection: Omit<SiteInspection, 'id'>) => void;
  quotations: Quotation[];
  onApproveQuotation: (id: string) => void;
  jobs: ServiceJob[];
  onToggleBatchComplete: (jobId: string, batchId: string) => void;
  invoices: InvoiceRecord[];
  onMarkInvoicePaid: (invoiceId: string) => void;
}

export const TeamDashboard: React.FC<TeamDashboardProps> = ({
  activeTab,
  setActiveTab,
  enquiries,
  onAdvanceEnquiryStatus,
  inspections,
  onAddInspection,
  quotations,
  onApproveQuotation,
  jobs,
  onToggleBatchComplete,
  invoices,
  onMarkInvoicePaid,
}) => {
  const [selectedQuotationId, setSelectedQuotationId] = useState<string>(quotations[0]?.id || 'QT-883');

  // New Site Inspection Form State
  const [inspCompany, setInspCompany] = useState('CloudHive Co-Working Spaces');
  const [inspTech, setInspTech] = useState('Rajesh Kumar (Senior Tech Lead)');
  const [inspTotalChairs, setInspTotalChairs] = useState(310);
  const [inspGasLifts, setInspGasLifts] = useState(45);
  const [inspCasters, setInspCasters] = useState(38);
  const [inspCleaning, setInspCleaning] = useState(310);
  const [inspNotes, setInspNotes] = useState('Sample 2 chairs deep cleaned on site. Client thrilled with stain removal.');

  const activeQuote = quotations.find((q) => q.id === selectedQuotationId) || quotations[0];
  const quoteSubtotal = activeQuote
    ? activeQuote.items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0)
    : 0;
  const quoteGst = Math.round(quoteSubtotal * 0.18);
  const quoteGrandTotal = quoteSubtotal + quoteGst;

  const handleCreateInspection = (e: React.FormEvent) => {
    e.preventDefault();
    onAddInspection({
      enquiryId: 'ENQ-2043',
      company: inspCompany,
      inspector: inspTech,
      date: '05 Oct 2026',
      totalChairsInspected: inspTotalChairs,
      gasLiftsNeeded: inspGasLifts,
      casterSetsNeeded: inspCasters,
      mechanismsNeeded: 14,
      armrestPairsNeeded: 22,
      deepCleaningNeeded: inspCleaning,
      upholsteryRefurbNeeded: 10,
      floorNotes: inspNotes,
      recommendedBatches: Math.max(1, Math.ceil(inspTotalChairs / 65)),
    });
  };

  const totalChairsInPipeline = enquiries.reduce((sum, e) => sum + e.chairQuantity, 0);
  const totalPipelineValue = enquiries.reduce((sum, e) => sum + e.estimatedValue, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">
      {/* Top CRM Operations Header */}
      <div className="bg-[#13293D] text-white rounded-3xl p-6 sm:p-8 border-b-4 border-emerald-500 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-2">
              What Your Team Can Do • Operations &amp; Service CRM
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Service Management &amp; Controlled Batch Execution Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Everything needed to turn bulk chair enquiries into inspected, quoted, batch-executed, photo-verified, and invoiced repeat jobs.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
            <div>
              <div className="text-xs text-slate-300">Active Enquiries</div>
              <div className="text-2xl font-extrabold text-emerald-400">{enquiries.length}</div>
            </div>
            <div>
              <div className="text-xs text-slate-300">Chairs Tracked</div>
              <div className="text-2xl font-extrabold text-amber-400">{totalChairsInPipeline}</div>
            </div>
            <div>
              <div className="text-xs text-slate-300">Pipeline Value</div>
              <div className="text-xl font-extrabold text-white">
                ₹{(totalPipelineValue / 100000).toFixed(2)}L
              </div>
            </div>
          </div>
        </div>

        {/* 7 Module Navigation Tabs matching Page 2 of PDF */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-white/10 overflow-x-auto no-scrollbar">
          {[
            { id: 'enquiries', label: '1. Enquiries & Follow-Up', icon: ClipboardList, count: enquiries.length },
            { id: 'inspections', label: '2. Site Inspections', icon: SearchCheck, count: inspections.length },
            { id: 'quotations', label: '3. Pro Quotations', icon: FileSpreadsheet, count: quotations.length },
            { id: 'jobs', label: '4. Job Scheduling & Batches', icon: CalendarClock, count: jobs.length },
            { id: 'photos', label: '5. Before/After Photo Proof', icon: Camera },
            { id: 'invoices', label: '6. Invoices & Next Follow-Up', icon: Receipt, count: invoices.length },
            { id: 'reports', label: '7. Business Reports', icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as CrmTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  active
                    ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-xs ${
                      active ? 'bg-slate-950/20 text-slate-950' : 'bg-white/15 text-white'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: TRACK EVERY ENQUIRY & FOLLOW-UP */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                Track Every Enquiry &amp; Follow-Up
              </h2>
              <p className="text-xs text-slate-500">
                Includes live enquiries submitted from the Customer Quote Form, WhatsApp Photo Button, and Callback Widget.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              Click "Advance Stage" on any enquiry to move it through the pipeline
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {enquiries.map((enq) => (
              <div
                key={enq.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-bold text-xs">
                      {enq.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
                      {enq.chairQuantity} Chairs • {enq.serviceType}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 font-semibold text-xs">
                      {enq.source}
                    </span>
                    <span className="text-xs text-slate-400">{enq.createdAt}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900">
                    {enq.company} — <span className="font-semibold text-slate-600">{enq.contactName}</span>
                  </h3>

                  <p className="text-xs text-slate-600">{enq.notes}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {enq.photoDescriptions.map((p, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
                      >
                        <Camera className="w-3 h-3 text-emerald-600" /> {p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-100 shrink-0">
                  <div className="text-left lg:text-right">
                    <div className="text-xs text-slate-400">Est. Job Value</div>
                    <div className="text-lg font-extrabold text-slate-900">
                      ₹{enq.estimatedValue.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Next: {enq.nextFollowUp}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 font-extrabold text-xs">
                      {enq.status}
                    </span>
                    <button
                      onClick={() => onAdvanceEnquiryStatus(enq.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#13293D] hover:bg-emerald-600 text-white font-bold text-xs transition-all"
                    >
                      Advance Stage →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RECORD SITE INSPECTIONS */}
      {activeTab === 'inspections' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              Record New On-Site Chair Inspection
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Field technicians log exact defective part counts by floor to auto-prepare batch quotations.
            </p>

            <form onSubmit={handleCreateInspection} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Company</label>
                <input
                  type="text"
                  value={inspCompany}
                  onChange={(e) => setInspCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Total Chairs Audited</label>
                  <input
                    type="number"
                    value={inspTotalChairs}
                    onChange={(e) => setInspTotalChairs(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inspector Name</label>
                  <input
                    type="text"
                    value={inspTech}
                    onChange={(e) => setInspTech(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-xs font-semibold text-slate-600">Gas Lifts</label>
                  <input
                    type="number"
                    value={inspGasLifts}
                    onChange={(e) => setInspGasLifts(Number(e.target.value))}
                    className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600">Caster Sets</label>
                  <input
                    type="number"
                    value={inspCasters}
                    onChange={(e) => setInspCasters(Number(e.target.value))}
                    className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600">Deep Clean</label>
                  <input
                    type="number"
                    value={inspCleaning}
                    onChange={(e) => setInspCleaning(Number(e.target.value))}
                    className="w-full mt-1 px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Floor &amp; Barcode Tagging Notes</label>
                <textarea
                  rows={2}
                  value={inspNotes}
                  onChange={(e) => setInspNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Save Site Inspection Sheet
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">
              Completed Site Inspection Records ({inspections.length})
            </h3>
            {inspections.map((insp) => (
              <div
                key={insp.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md mr-2">
                      {insp.id}
                    </span>
                    <span className="font-extrabold text-slate-900 text-base">{insp.company}</span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Audited by <strong>{insp.inspector}</strong> • {insp.date}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-slate-50 p-3 rounded-xl text-center">
                  <div>
                    <div className="text-xs text-slate-500">Audited</div>
                    <div className="text-sm font-extrabold text-slate-900">{insp.totalChairsInspected}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Gas Lifts</div>
                    <div className="text-sm font-extrabold text-emerald-600">{insp.gasLiftsNeeded}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Casters</div>
                    <div className="text-sm font-extrabold text-emerald-600">{insp.casterSetsNeeded}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Mechanisms</div>
                    <div className="text-sm font-extrabold text-emerald-600">{insp.mechanismsNeeded}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Deep Clean</div>
                    <div className="text-sm font-extrabold text-amber-600">{insp.deepCleaningNeeded}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Batches</div>
                    <div className="text-sm font-extrabold text-slate-900">{insp.recommendedBatches}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-600">{insp.floorNotes}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROFESSIONAL QUOTATION DOCUMENT GENERATOR */}
      {activeTab === 'quotations' && activeQuote && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {quotations.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSelectedQuotationId(q.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedQuotationId === q.id
                      ? 'bg-[#13293D] text-white'
                      : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {q.id} — {q.company}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onApproveQuotation(activeQuote.id)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Customer Approved</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> Print / Save PDF
              </button>
            </div>
          </div>

          {/* Formal Corporate Quotation Document */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="bg-[#13293D] text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-4 border-b-4 border-amber-500">
              <div>
                <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  CHAIRCARE PRO INDUSTRIAL SERVICES LLP
                </div>
                <h3 className="text-2xl font-extrabold mt-1">
                  COMMERCIAL SERVICE &amp; BATCH REPAIR QUOTATION
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  GSTIN: 27AABCC4921G1Z8 • ISO 9001:2015 Certified Ergonomic Seating Maintenance
                </p>
              </div>
              <div className="sm:text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-xs mb-2">
                  {activeQuote.status}
                </span>
                <div className="text-xs text-slate-300">Quote Ref: <strong className="text-white">{activeQuote.id}</strong></div>
                <div className="text-xs text-slate-300">Date: {activeQuote.date}</div>
                <div className="text-xs text-amber-300">Valid Until: {activeQuote.validUntil}</div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <div className="font-bold text-slate-400 uppercase">Prepared For Client</div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5">{activeQuote.company}</div>
                  <div className="text-slate-600">Attn: {activeQuote.contactName}</div>
                </div>
                <div>
                  <div className="font-bold text-slate-400 uppercase">Controlled Batch Execution Plan</div>
                  <div className="text-slate-800 font-semibold mt-0.5">{activeQuote.batchScheduleNote}</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-xs font-extrabold text-slate-500 uppercase">
                      <th className="py-3 px-2">#</th>
                      <th className="py-3 px-2">Service / BIFMA Component Description</th>
                      <th className="py-3 px-2">SAC / Code</th>
                      <th className="py-3 px-2 text-right">Chair Qty</th>
                      <th className="py-3 px-2 text-right">Unit Rate</th>
                      <th className="py-3 px-2 text-right">Line Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs">
                    {activeQuote.items.map((item, idx) => (
                      <tr key={item.id}>
                        <td className="py-3.5 px-2 font-bold text-slate-500">{idx + 1}</td>
                        <td className="py-3.5 px-2 font-bold text-slate-900">{item.description}</td>
                        <td className="py-3.5 px-2 text-slate-500">{item.hsnOrCode}</td>
                        <td className="py-3.5 px-2 text-right font-semibold">{item.qty}</td>
                        <td className="py-3.5 px-2 text-right">₹{item.unitPrice.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 px-2 text-right font-extrabold text-slate-900">
                          ₹{(item.qty * item.unitPrice).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pt-4 border-t border-slate-200">
                <div className="text-xs text-slate-600 max-w-md space-y-1">
                  <div className="font-bold text-slate-900">Warranty &amp; Photo Proof Assurance:</div>
                  <p>{activeQuote.warrantyNote}</p>
                  <p className="text-emerald-700 font-semibold">
                    ✓ Every batch includes timestamped Before &amp; After photo verification prior to invoice sign-off.
                  </p>
                </div>

                <div className="w-full sm:w-64 bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal:</span>
                    <span className="font-bold">₹{quoteSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">GST (18%):</span>
                    <span className="font-bold">₹{quoteGst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-300 text-sm font-extrabold text-emerald-700">
                    <span>Grand Total:</span>
                    <span>₹{quoteGrandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4 & TAB 5: SCHEDULE JOBS, ASSIGN TECHNICIANS & CAPTURE BEFORE/AFTER PHOTOS */}
      {(activeTab === 'jobs' || activeTab === 'photos') && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {activeTab === 'jobs'
                ? 'Controlled Batch Job Scheduling & Technician Assignment'
                : 'Before / After Batch Photo Proof Verification Vault'}
            </h2>
            <p className="text-xs text-slate-500">
              Click any batch below to toggle batch completion and verify mandatory Before/After photo proof.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => {
              const pct = Math.round((job.completedChairs / job.totalChairs) * 100);
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#13293D] text-white text-xs font-bold">
                          {job.id}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                          {job.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-extrabold text-slate-900">{job.company}</h3>
                      <p className="text-xs text-slate-500">
                        Assigned Lead: <strong className="text-slate-800">{job.leadTechnician}</strong> ({job.crewMembers} Technicians) • Location: {job.location}
                      </p>
                    </div>

                    <div className="w-full sm:w-64">
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Batch Completion Progress</span>
                        <span className="text-emerald-600">
                          {job.completedChairs} / {job.totalChairs} Chairs ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          style={{ width: `${pct}%` }}
                          className="h-full bg-emerald-500 transition-all duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {job.batches.map((batch) => (
                      <div
                        key={batch.id}
                        className={`rounded-2xl p-4 border transition-all ${
                          batch.status === 'Completed'
                            ? 'bg-emerald-50/60 border-emerald-300'
                            : 'bg-amber-50/50 border-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-extrabold text-slate-900">
                            {batch.chairCount} Chairs
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                              batch.status === 'Completed'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-amber-500 text-slate-950'
                            }`}
                          >
                            {batch.status}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-800 mb-3">{batch.name}</div>

                        <div className="flex items-center gap-2 text-xs mb-3">
                          <span className="px-2 py-1 rounded bg-white border border-slate-200 font-semibold text-emerald-700">
                            ✓ Before Photo
                          </span>
                          <span
                            className={`px-2 py-1 rounded bg-white border font-semibold ${
                              batch.afterPhotosCaptured
                                ? 'border-emerald-300 text-emerald-700'
                                : 'border-amber-300 text-amber-700'
                            }`}
                          >
                            {batch.afterPhotosCaptured ? '✓ After Photo' : '⏳ Pending After Photo'}
                          </span>
                        </div>

                        <button
                          onClick={() => onToggleBatchComplete(job.id, batch.id)}
                          className="w-full py-2 rounded-xl bg-[#13293D] hover:bg-emerald-600 text-white font-bold text-xs transition-all"
                        >
                          {batch.status === 'Completed'
                            ? 'Re-open Batch QA'
                            : '✓ Upload After Photo & Complete Batch'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 6: TRACK INVOICES, PAYMENTS & NEXT-SERVICE FOLLOW-UP */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              Invoices, Payment Collection &amp; Repeat AMC Follow-Up
            </h2>
            <p className="text-xs text-slate-500">
              Step 6 of "How It Works": Collect payment after photo proof and automatically schedule the next maintenance follow-up.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-slate-900 text-white text-xs font-bold">
                      {inv.id}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                        inv.status === 'Paid in Full'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {inv.company} ({inv.chairCount} Chairs Restored)
                  </h4>
                  <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" /> Next Repeat Service Follow-Up Scheduled:{' '}
                    <strong>{inv.nextServiceFollowUp}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Paid / Total</div>
                    <div className="text-base font-extrabold text-slate-900">
                      ₹{inv.paidAmount.toLocaleString('en-IN')} / ₹{inv.totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  {inv.status !== 'Paid in Full' && (
                    <button
                      onClick={() => onMarkInvoicePaid(inv.id)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold"
                    >
                      Record Full Payment
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: BASIC BUSINESS REPORTS */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="text-xs font-extrabold uppercase text-emerald-600 mb-1">
              Revenue Mix (Service-First Goal)
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">
              78% Income from Repair, Cleaning &amp; AMC
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Bulk Chair Repair &amp; Spares</span>
                  <span>44% (₹4.8L)</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[44%] h-full bg-emerald-600" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Old Chair Bio-Cleaning &amp; Refurb</span>
                  <span>34% (₹3.7L)</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[34%] h-full bg-teal-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Corporate AMC &amp; New Supply</span>
                  <span>22% (₹2.4L)</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[22%] h-full bg-amber-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
            <div className="text-xs font-extrabold uppercase text-amber-600 mb-1">
              Conversion Funnel
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-4">
              Photo Enquiry to Batch Job Rate: 68%
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-700">
              <li className="flex justify-between p-2.5 rounded-xl bg-slate-50 font-semibold">
                <span>1. Website &amp; WhatsApp Photo Enquiries</span>
                <span className="font-extrabold">42 Leads</span>
              </li>
              <li className="flex justify-between p-2.5 rounded-xl bg-slate-50 font-semibold">
                <span>2. On-Site Inspections Completed</span>
                <span className="font-extrabold">34 Sites</span>
              </li>
              <li className="flex justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-bold">
                <span>3. Batch Jobs Approved &amp; Completed</span>
                <span className="font-extrabold">29 Corporate Jobs</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#13293D] text-white rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase text-amber-400">
                Repeat Business Engine
              </span>
              <h3 className="text-xl font-extrabold mt-1 mb-2">
                2,840 Corporate Chairs Under Active 6-Month AMC Follow-Up
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every completed repair and cleaning batch automatically schedules a 180-day preventive checkup reminder so your team wins repeat corporate orders effortlessly.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-bold">Next 30 Days Renewal Value:</span>
              <span className="text-lg font-extrabold text-white">₹3,45,000</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
