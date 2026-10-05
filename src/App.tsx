import React, { useState } from 'react';
import {
  Wrench,
  LayoutDashboard,
  FileText,
  PhoneCall,
  MessageSquare,
  Camera,
  CheckCircle2,
  X,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  AppMode,
  CustomerPage,
  CrmTab,
  Enquiry,
  EnquiryStatus,
  SiteInspection,
  Quotation,
  ServiceJob,
  InvoiceRecord,
} from './types';
import {
  INITIAL_ENQUIRIES,
  INITIAL_INSPECTIONS,
  INITIAL_QUOTATIONS,
  INITIAL_JOBS,
  INITIAL_INVOICES,
} from './data/initialData';
import { CustomerWebsite } from './components/CustomerWebsite';
import { TeamDashboard } from './components/TeamDashboard';
import { BlueprintView } from './components/BlueprintView';

const STATUS_ORDER: EnquiryStatus[] = [
  'New Enquiry',
  'Inspection Scheduled',
  'Quoted',
  'Approved - In Batch',
  'Completed & Invoiced',
];

export function App() {
  const [mode, setMode] = useState<AppMode>('website');
  const [customerPage, setCustomerPage] = useState<CustomerPage>('home');
  const [crmTab, setCrmTab] = useState<CrmTab>('enquiries');

  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [inspections, setInspections] = useState<SiteInspection[]>(INITIAL_INSPECTIONS);
  const [quotations, setQuotations] = useState<Quotation[]>(INITIAL_QUOTATIONS);
  const [jobs, setJobs] = useState<ServiceJob[]>(INITIAL_JOBS);
  const [invoices, setInvoices] = useState<InvoiceRecord[]>(INITIAL_INVOICES);

  // Floating Modals State (WhatsApp Photo Quote & Instant Callback)
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [cbCompany, setCbCompany] = useState('');
  const [cbPhone, setCbPhone] = useState('');
  const [cbChairs, setCbChairs] = useState(80);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleAddEnquiry = (
    newEnq: Omit<Enquiry, 'id' | 'createdAt' | 'status' | 'nextFollowUp'>
  ) => {
    const created: Enquiry = {
      ...newEnq,
      id: `ENQ-${2045 + enquiries.length}`,
      createdAt: 'Just Now',
      status: 'New Enquiry',
      nextFollowUp: 'Today (Within 30 Mins)',
    };
    setEnquiries([created, ...enquiries]);
    triggerToast(
      `New Enquiry ${created.id} (${created.chairQuantity} chairs) logged into Team Service CRM!`
    );
  };

  const handleAdvanceEnquiryStatus = (id: string) => {
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id !== id) return e;
        const idx = STATUS_ORDER.indexOf(e.status);
        const nextStatus = STATUS_ORDER[Math.min(STATUS_ORDER.length - 1, idx + 1)];
        return { ...e, status: nextStatus };
      })
    );
    triggerToast(`Updated enquiry ${id} pipeline stage.`);
  };

  const handleAddInspection = (newInsp: Omit<SiteInspection, 'id'>) => {
    const created: SiteInspection = {
      ...newInsp,
      id: `INSP-${501 + inspections.length}`,
    };
    setInspections([created, ...inspections]);
    triggerToast(`Site Inspection ${created.id} recorded for ${created.company}!`);
  };

  const handleApproveQuotation = (id: string) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: 'Customer Approved' } : q))
    );
    triggerToast(`Quotation ${id} marked Customer Approved & ready for batch scheduling!`);
  };

  const handleToggleBatchComplete = (jobId: string, batchId: string) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id !== jobId) return job;
        const updatedBatches = job.batches.map((b) => {
          if (b.id !== batchId) return b;
          const nextDone = b.status !== 'Completed';
          return {
            ...b,
            status: (nextDone ? 'Completed' : 'In Progress') as 'Completed' | 'In Progress',
            afterPhotosCaptured: nextDone,
          };
        });
        const completedChairs = updatedBatches
          .filter((b) => b.status === 'Completed')
          .reduce((s, b) => s + b.chairCount, 0);
        return {
          ...job,
          batches: updatedBatches,
          completedChairs,
          status: completedChairs >= job.totalChairs ? 'Photo Proof Verified' : 'In Batch Execution',
        };
      })
    );
    triggerToast(`Updated batch status & Before/After photo verification for ${jobId}.`);
  };

  const handleMarkInvoicePaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId
          ? { ...inv, paidAmount: inv.totalAmount, status: 'Paid in Full' }
          : inv
      )
    );
    triggerToast(`Invoice ${invoiceId} marked Paid in Full! 6-Month AMC reminder active.`);
  };

  const handleQuickCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cbPhone) return;
    handleAddEnquiry({
      company: cbCompany || 'Corporate Callback Lead',
      contactName: 'Facility Manager',
      phone: cbPhone,
      email: 'callback@corporate.in',
      location: 'On-Site Visit Requested',
      chairQuantity: cbChairs,
      serviceType: 'Repair + Deep Cleaning',
      issues: ['Requested Instant Callback & Inspection'],
      photoCount: 1,
      photoDescriptions: ['WhatsApp Photo Pending'],
      source: 'Instant Callback',
      estimatedValue: cbChairs * 550,
      notes: 'Urgent callback requested via floating quick-action bar.',
    });
    setShowCallbackModal(false);
    setCbCompany('');
    setCbPhone('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* TOP MASTER NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#0B1926] text-white border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <div
            onClick={() => {
              setMode('website');
              setCustomerPage('home');
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-extrabold shadow-glow-emerald">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight flex items-center gap-2">
                <span>ChairCare Pro</span>
                <span className="hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                  SERVICE-FIRST SYSTEM
                </span>
              </div>
              <div className="text-xs text-slate-400 hidden sm:block">
                Bulk Chair Repair • Bio-Extraction Cleaning • Corporate AMC
              </div>
            </div>
          </div>

          {/* 3-Mode Master Switcher: Customer Website | Team Service CRM | PDF Blueprint */}
          <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setMode('website')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                mode === 'website'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Website</span>
            </button>

            <button
              onClick={() => setMode('crm')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                mode === 'crm'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Team CRM &amp; Ops</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-950/30 text-[11px]">
                {enquiries.length}
              </span>
            </button>

            <button
              onClick={() => setMode('blueprint')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                mode === 'blueprint'
                  ? 'bg-white text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden md:inline">PDF Requirement Map</span>
            </button>
          </div>
        </div>
      </header>

      {/* LIVE TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-2.5 text-xs font-bold animate-bounce">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN VIEW CONTENT */}
      <main className="flex-1">
        {mode === 'website' && (
          <CustomerWebsite
            activePage={customerPage}
            setActivePage={setCustomerPage}
            onSubmitEnquiry={handleAddEnquiry}
            onSwitchToCrm={() => {
              setMode('crm');
              setCrmTab('enquiries');
            }}
            onOpenCallbackModal={() => setShowCallbackModal(true)}
            onOpenWhatsAppModal={() => setShowWhatsAppModal(true)}
          />
        )}

        {mode === 'crm' && (
          <TeamDashboard
            activeTab={crmTab}
            setActiveTab={setCrmTab}
            enquiries={enquiries}
            onAdvanceEnquiryStatus={handleAdvanceEnquiryStatus}
            inspections={inspections}
            onAddInspection={handleAddInspection}
            quotations={quotations}
            onApproveQuotation={handleApproveQuotation}
            jobs={jobs}
            onToggleBatchComplete={handleToggleBatchComplete}
            invoices={invoices}
            onMarkInvoicePaid={handleMarkInvoicePaid}
          />
        )}

        {mode === 'blueprint' && (
          <BlueprintView
            onNavigateWebsite={(page) => {
              setMode('website');
              setCustomerPage(page);
            }}
            onNavigateCrm={(tab) => {
              setMode('crm');
              setCrmTab(tab);
            }}
          />
        )}
      </main>

      {/* FLOATING WHATSAPP, CALL & CALLBACK BAR (REQUIRED BY PDF PAGE 2) */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col sm:flex-row items-end sm:items-center gap-2.5 bg-[#13293D]/95 backdrop-blur-md p-2.5 rounded-2xl border border-white/15 shadow-2xl">
        <button
          onClick={() => setShowWhatsAppModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-glow-emerald transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Chair Photos</span>
        </button>

        <a
          href="tel:+919820451290"
          className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
          <span>Call Service Desk</span>
        </a>

        <button
          onClick={() => setShowCallbackModal(true)}
          className="px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all"
        >
          <span>Instant Callback</span>
        </button>
      </div>

      {/* INSTANT CALLBACK MODAL */}
      {showCallbackModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-t-8 border-amber-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-extrabold text-slate-900">
                Request 15-Min Service Callback
              </h3>
              <button
                onClick={() => setShowCallbackModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleQuickCallbackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TechMahindra Facility Team"
                  value={cbCompany}
                  onChange={(e) => setCbCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile / Direct Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 98XXX XXXXX"
                  value={cbPhone}
                  onChange={(e) => setCbPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Approx. Number of Chairs: <strong>{cbChairs} Chairs</strong>
                </label>
                <input
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={cbChairs}
                  onChange={(e) => setCbChairs(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#13293D] hover:bg-emerald-600 text-white font-extrabold text-xs transition-all"
              >
                Log Callback in Team CRM Now →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* WHATSAPP PHOTO QUOTE SIMULATOR MODAL */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border-t-8 border-emerald-500">
            <div className="bg-[#075E54] text-white p-5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-200">WhatsApp Business Quick Quote</div>
                <h3 className="text-base font-extrabold">ChairCare Pro — Bulk Desk</h3>
              </div>
              <button onClick={() => setShowWhatsAppModal(false)}>
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-5 bg-[#ECE5DD] space-y-3 text-xs">
              <div className="bg-white p-3 rounded-xl shadow-sm max-w-[85%] text-slate-800">
                👋 Hi! Send us <strong>2–3 photos of your office chairs</strong> and the <strong>total chair count</strong>. We'll reply with a batch repair &amp; deep-cleaning estimate in 15 mins!
              </div>
              <div className="bg-[#DCF8C6] p-3 rounded-xl shadow-sm ml-auto max-w-[85%] text-slate-900">
                Hi, we have around <strong>140 ergonomic mesh chairs</strong> at our office needing hydraulic gas lift repair and deep foam cleaning. Attaching 3 floor photos.
              </div>
            </div>
            <div className="p-4 bg-white flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  handleAddEnquiry({
                    company: 'WhatsApp Corporate Lead',
                    contactName: 'Admin Desk (via WhatsApp)',
                    phone: '+91 98200 11223',
                    email: 'whatsapp@corp.in',
                    location: 'Shared via WhatsApp Pin',
                    chairQuantity: 140,
                    serviceType: 'Repair + Deep Cleaning',
                    issues: ['Hydraulic Gas Lift Repair', 'Deep Mesh & Foam Cleaning'],
                    photoCount: 3,
                    photoDescriptions: ['WhatsApp_Chair_Bay1.jpg', 'WhatsApp_GasLift.jpg', 'WhatsApp_Stain.jpg'],
                    source: 'WhatsApp Photo Quote',
                    estimatedValue: 84000,
                    notes: 'Simulated WhatsApp photo enquiry logged directly into Team CRM.',
                  });
                  setShowWhatsAppModal(false);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" /> Send Photos &amp; Log to Team CRM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
