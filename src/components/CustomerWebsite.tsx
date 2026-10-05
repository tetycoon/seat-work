import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Sparkles,
  ShieldCheck,
  Camera,
  PhoneCall,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Building2,
  Layers,
  Upload,
  FileText,
  Award,
  TrendingDown,
  Clock,
  Package,
  RefreshCw,
} from 'lucide-react';
import { CustomerPage, Enquiry } from '../types';
import { BEFORE_AFTER_CASES, CHAIR_HOTSPOTS } from '../data/initialData';
import { InteractiveChairAnatomy } from './InteractiveChairAnatomy';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface CustomerWebsiteProps {
  activePage: CustomerPage;
  setActivePage: (page: CustomerPage) => void;
  onSubmitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status' | 'nextFollowUp'>) => void;
  onSwitchToCrm: () => void;
  onOpenCallbackModal: () => void;
  onOpenWhatsAppModal: () => void;
}

export const CustomerWebsite: React.FC<CustomerWebsiteProps> = ({
  activePage,
  setActivePage,
  onSubmitEnquiry,
  onSwitchToCrm,
  onOpenCallbackModal,
  onOpenWhatsAppModal,
}) => {
  const [selectedParts, setSelectedParts] = useState<string[]>([
    'BIFMA Class-4 Hydraulic Gas Lift',
    'High-Density Molded Seat Cushion & Deep Extraction',
  ]);

  // AMC ROI Calculator State
  const [amcChairCount, setAmcChairCount] = useState<number>(150);
  const [cleaningTierFabric, setCleaningTierFabric] = useState<'mesh' | 'fabric' | 'leatherette'>('mesh');

  // Quote Form State
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [chairQuantity, setChairQuantity] = useState<number>(120);
  const [serviceType, setServiceType] = useState<Enquiry['serviceType']>('Repair + Deep Cleaning');
  const [photoDescriptions, setPhotoDescriptions] = useState<string[]>([
    'Workstation Bay - Sinking Gas Lifts (Photo_01.jpg)',
    'Conference Room - Stained Mesh & Armrests (Photo_02.jpg)',
  ]);
  const [customNotes, setCustomNotes] = useState('');
  const [submittedBanner, setSubmittedBanner] = useState<boolean>(false);

  const togglePart = (partName: string) => {
    setSelectedParts((prev) =>
      prev.includes(partName) ? prev.filter((p) => p !== partName) : [...prev, partName]
    );
  };

  const handleAddPresetPhoto = (label: string) => {
    if (!photoDescriptions.includes(label)) {
      setPhotoDescriptions([...photoDescriptions, label]);
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !contactName || !phone) return;

    const unitEst =
      serviceType === 'Old Chair Cleaning'
        ? 240
        : serviceType === 'Corporate AMC'
        ? 650
        : 620;

    onSubmitEnquiry({
      company,
      contactName,
      phone,
      email: email || 'facilities@clientcorp.com',
      location: location || 'Corporate Tech Park',
      chairQuantity,
      serviceType,
      issues: selectedParts.length > 0 ? selectedParts : ['General Batch Assessment & Cleaning'],
      photoCount: photoDescriptions.length,
      photoDescriptions,
      source: 'Website Quote Form',
      estimatedValue: chairQuantity * unitEst,
      notes: customNotes || 'Requested controlled batch execution with photo proof.',
    });

    setSubmittedBanner(true);
    setCompany('');
    setContactName('');
    setPhone('');
  };

  // Helper to show sections either when on 'home' (full showcase) or focused subpage
  const showSection = (page: CustomerPage) => activePage === 'home' || activePage === page;

  const newChairReplacementCost = amcChairCount * 5200;
  const ourBatchRepairAndAmcCost = amcChairCount * 680;
  const totalCorporateSavings = newChairReplacementCost - ourBatchRepairAndAmcCost;

  return (
    <div className="space-y-16 pb-24">
      {/* SUB-PAGE PILL BAR FOR QUICK JUMPING */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'home', label: 'All Service-First View' },
              { id: 'repair', label: 'Chair Repair' },
              { id: 'cleaning', label: 'Old Chair Cleaning' },
              { id: 'amc', label: 'Corporate AMC & Bulk' },
              { id: 'work', label: 'Before / After Work' },
              { id: 'products', label: 'Spares & New Chairs' },
              { id: 'quote', label: 'Quote with Photos & Qty' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePage(tab.id as CustomerPage)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activePage === tab.id
                    ? 'bg-[#13293D] text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            On-Site Batch Repair Teams Available Today
          </div>
        </div>
      </div>

      {/* 1. HERO SECTION — LEADS WITH REPAIR, CLEANING & REPEAT SERVICE */}
      {showSection('home') && (
        <section className="relative bg-[#13293D] text-white overflow-hidden pt-10 pb-16 lg:py-20 -mt-16">
          {/* PDF-inspired geometric dark circles & dual-tone bottom stripe */}
          <div className="absolute -top-28 -right-24 w-[440px] h-[440px] rounded-full bg-[#1C3A54]/70 pointer-events-none" />
          <div className="absolute top-36 -right-12 w-[260px] h-[260px] rounded-full bg-[#0D1E2E]/90 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wider uppercase">
                  <Wrench className="w-3.5 h-3.5" /> Chair Service Business • Service-First System
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.08]">
                  BULK CHAIR REPAIR, <br />
                  <span className="text-emerald-400">DEEP CLEANING</span> &amp; <br />
                  CORPORATE AMC.
                </h1>

                <div className="border-l-4 border-amber-500 pl-4 py-1 text-slate-200 text-base sm:text-lg max-w-2xl">
                  Focused on bulk office chair repairing, old chair bio-extraction cleaning, full refurbishment, and controlled batch maintenance for companies with 20 to 5,000+ chairs.
                </div>

                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={() => setActivePage('quote')}
                    className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center gap-2.5 shadow-glow-emerald transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Get Quote with Chair Photos &amp; Qty</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenWhatsAppModal}
                    className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Photos for Fast Quote</span>
                  </button>

                  <button
                    onClick={onOpenCallbackModal}
                    className="px-4 py-4 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Request Callback</span>
                  </button>
                </div>

                {/* Live Service Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-2xl font-extrabold text-emerald-400">75% Saved</div>
                    <div className="text-xs text-slate-300">vs Buying New Chairs</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-amber-400">Batch Mode</div>
                    <div className="text-xs text-slate-300">Zero Office Downtime</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-white">100% Photo</div>
                    <div className="text-xs text-slate-300">Before/After Proof Log</div>
                  </div>
                  <div>
                    <div className="text-2xl font-extrabold text-emerald-400">24 Months</div>
                    <div className="text-xs text-slate-300">BIFMA Spares Warranty</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Instant Bulk Service Triage Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-5"
              >
                <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-7 shadow-2xl border-t-8 border-amber-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      Instant Batch Calculator
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Step 1 of 6</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                    How Many Chairs Need Repair or Cleaning?
                  </h3>
                  <p className="text-xs text-slate-500 mb-5">
                    Assess your savings immediately and book an on-site inspection.
                  </p>

                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div className="flex justify-between text-sm font-bold mb-2">
                        <span>Total Corporate Chairs:</span>
                        <span className="text-emerald-600 text-lg">{amcChairCount} Chairs</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={600}
                        step={5}
                        value={amcChairCount}
                        onChange={(e) => setAmcChairCount(Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-slate-400 mt-1">
                        <span>15 Chairs (Startup)</span>
                        <span>150 Chairs (Floor)</span>
                        <span>600+ (IT Campus)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-3">
                        <div className="text-xs text-rose-700 font-semibold">Buying New Chairs</div>
                        <div className="text-lg font-extrabold text-rose-900 line-through">
                          ₹{newChairReplacementCost.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-rose-600">@ ~₹5,200/chair</div>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3">
                        <div className="text-xs text-emerald-700 font-semibold">Our Repair + Deep Clean</div>
                        <div className="text-lg font-extrabold text-emerald-900">
                          ₹{ourBatchRepairAndAmcCost.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs text-emerald-700 font-bold">
                          Save ₹{totalCorporateSavings.toLocaleString('en-IN')}!
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#13293D] text-white rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-amber-400 font-bold uppercase">Controlled Batch Plan</div>
                        <div className="text-sm font-semibold">
                          Completed in {Math.max(1, Math.ceil(amcChairCount / 60))} Batches (~60 chairs/day)
                        </div>
                      </div>
                      <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
                    </div>

                    <button
                      onClick={() => {
                        setChairQuantity(amcChairCount);
                        setActivePage('quote');
                      }}
                      className="w-full py-3.5 bg-[#0F9D76] hover:bg-emerald-700 text-white font-extrabold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                    >
                      <span>Lock Estimate &amp; Upload Chair Photos</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Exact PDF Dual-Tone Accent Bar at Bottom of Hero */}
          <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-emerald-500 flex">
            <div className="w-48 bg-amber-500 h-full ml-12 sm:ml-24" />
          </div>
        </section>
      )}

      {/* PDF CORE VALUE PROPOSITION & "NOT JUST A PRODUCT CATALOGUE" BANNER */}
      {showSection('home') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-xs font-extrabold uppercase tracking-widest text-emerald-600">
            OUR SERVICE-FIRST PROMISE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 max-w-3xl mb-6">
            Making bulk chair repair and bio-cleaning the first priority — engineered specifically for companies with many chairs.
          </h2>

          {/* Exact Dark Callout Box from Page 1 of the PDF */}
          <div className="bg-[#13293D] text-white rounded-2xl p-6 sm:p-8 border-l-8 border-amber-500 shadow-xl mb-8">
            <div className="text-amber-400 font-extrabold text-lg sm:text-xl tracking-wide uppercase mb-2">
              NOT JUST A PRODUCT CATALOGUE WITH A CONTACT FORM.
            </div>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-4xl">
              A complete service-selling &amp; execution system: bring in bulk chair repair and cleaning enquiries, assess them quickly on-site, quote professionally, complete the work in controlled batches without disrupting office hours, record before/after photo proof, collect payment, and schedule the next maintenance job.
            </p>
          </div>

          {/* 3 Pillar Cards matching Page 1 Bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F2F9F6] rounded-2xl p-6 border-t-4 border-amber-500 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Main Income Focus: Bulk Service</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Chair repairing, deep foam &amp; mesh cleaning, full refurbishment, Annual Maintenance Contracts (AMC), and controlled corporate batch jobs.
              </p>
              <button
                onClick={() => setActivePage('repair')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Explore Chair Repair &amp; AMC <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#F2F9F6] rounded-2xl p-6 border-t-4 border-amber-500 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center mb-4">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Also Shown: Spares &amp; New Supply</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                ANSI/BIFMA Grade-4 gas lifts, silent PU casters, heavy-duty mechanisms, plus new ergonomic chair supply for expanding corporate floors.
              </p>
              <button
                onClick={() => setActivePage('products')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                View Spare Parts &amp; Chairs <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-[#F2F9F6] rounded-2xl p-6 border-t-4 border-amber-500 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#13293D] text-emerald-400 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">End-to-End Job &amp; Quote Tracking</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Every enquiry submitted here flows straight into the Team Service CRM — from Site Inspection &amp; PDF Quotation to Batch Photo Proof &amp; Invoicing.
              </p>
              <button
                onClick={onSwitchToCrm}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Open Live Team CRM Portal <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 6-STEP "HOW IT WORKS" INTERACTIVE WORKFLOW (FROM PAGE 2 OF PDF) */}
      {showSection('home') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-emerald-600 rounded-full" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How It Works</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Transparent 6-stage controlled batch workflow from initial photo enquiry to repeat AMC follow-up
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                step: '1',
                title: 'Customer Enquires',
                desc: 'Reach out via Website Quote, WhatsApp button, or Instant Callback.',
                actionLabel: 'Start Enquiry',
                target: 'quote' as CustomerPage,
              },
              {
                step: '2',
                title: 'Shares Photos & Qty',
                desc: 'Upload 2–5 photos of damaged/stained chairs and approximate chair count.',
                actionLabel: 'Upload Photos',
                target: 'quote' as CustomerPage,
              },
              {
                step: '3',
                title: 'We Inspect & Quote',
                desc: 'Our technician audits chairs by floor and sends an itemized formal quotation.',
                actionLabel: 'See Sample Quote',
                target: 'crm' as const,
              },
              {
                step: '4',
                title: 'Customer Approves',
                desc: 'Approve quotation & lock convenient batch timings (weekday or weekend).',
                actionLabel: 'Batch Options',
                target: 'amc' as CustomerPage,
              },
              {
                step: '5',
                title: 'Repair / Clean + Proof',
                desc: 'Executed in tagged batches with mandatory Before & After photo verification.',
                actionLabel: 'See Photo Proof',
                target: 'work' as CustomerPage,
              },
              {
                step: '6',
                title: 'Invoice & Next Follow-Up',
                desc: 'GST Invoice settled + automated 6-month hygiene & hydraulic check reminder.',
                actionLabel: 'View CRM Tracker',
                target: 'crm' as const,
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="bg-[#F2F9F6] border-t-4 border-emerald-600 rounded-2xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <div className="text-3xl font-extrabold text-emerald-600 mb-2 font-display">
                    {item.step}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    item.target === 'crm' ? onSwitchToCrm() : setActivePage(item.target)
                  }
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 mt-auto"
                >
                  <span>{item.actionLabel}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 2. CHAIR REPAIR PAGE / INTERACTIVE ANATOMY SECTION */}
      {showSection('repair') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-10 bg-emerald-600 rounded-full mt-1" />
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                  CORE REVENUE SERVICE #1
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Bulk Office Chair Repair &amp; Component Overhaul
                </h2>
                <p className="text-sm text-slate-600">
                  Don't scrap expensive ergonomic chairs because of a ₹480 hydraulic cylinder or worn casters.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActivePage('quote')}
              className="px-5 py-2.5 rounded-xl bg-[#13293D] text-white text-xs font-bold hover:bg-slate-800 transition-all self-start md:self-auto"
            >
              Request On-Site Repair Audit →
            </button>
          </div>

          {/* Interactive SVG Chair Anatomy Component */}
          <InteractiveChairAnatomy
            selectedParts={selectedParts}
            onTogglePart={togglePart}
            onJumpToQuote={() => setActivePage('quote')}
          />

          {/* Grid of All 6 Repair Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CHAIR_HOTSPOTS.map((part) => {
              const picked = selectedParts.includes(part.name);
              return (
                <div
                  key={part.id}
                  className={`rounded-2xl p-5 border transition-all ${
                    picked
                      ? 'bg-emerald-50/70 border-emerald-400 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      ₹{part.repairPrice} / chair
                    </span>
                    <span className="text-xs text-slate-500">{part.warrantyMonths}M Warranty</span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-base mb-1">{part.name}</h4>
                  <p className="text-xs text-slate-600 mb-4">{part.commonSymptom}</p>
                  <button
                    onClick={() => togglePart(part.name)}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      picked
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {picked ? '✓ Selected for Quote' : '+ Add to Bulk Repair Quote'}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. OLD CHAIR DEEP CLEANING & SANITIZATION PAGE */}
      {showSection('cleaning') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#F2F9F6] via-white to-emerald-50/60 rounded-3xl border border-emerald-200/80 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Core Revenue Service #2
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Old Chair Bio-Enzymatic Deep Cleaning &amp; Steam Sanitization
                </h2>
                <p className="text-sm text-slate-600 max-w-2xl mt-1">
                  Office chairs accumulate 3x more sweat, dead skin, food spills, and allergens than office carpets. Our 5-stage industrial injection-extraction system restores showroom freshness in 2 hours drying time.
                </p>
              </div>

              {/* Chair Upholstery Selector */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
                {(
                  [
                    { id: 'mesh', label: 'Ergonomic Mesh (₹190)' },
                    { id: 'fabric', label: 'Fabric Cushion (₹230)' },
                    { id: 'leatherette', label: 'Executive Leather (₹260)' },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCleaningTierFabric(t.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      cleaningTierFabric === t.id
                        ? 'bg-[#13293D] text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 5-Stage Cleaning Process Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {[
                {
                  stage: 'Stage 01',
                  title: 'Industrial HEPA Dry Vacuum',
                  detail: 'Extracts loose dust mites, hair, and dry debris deep inside mesh weaves and seat crevices.',
                },
                {
                  stage: 'Stage 02',
                  title: 'Bio-Enzymatic Foam Scrub',
                  detail: 'Eco-safe fabric shampoo breaks down coffee rings, body oils, and collar sweat marks.',
                },
                {
                  stage: 'Stage 03',
                  title: 'Hot-Water Wet Extraction',
                  detail: 'High-suction German extraction machine pulls out 95% of dirty moisture & grime from foam.',
                },
                {
                  stage: 'Stage 04',
                  title: '140°C Steam Sanitization',
                  detail: 'Eliminates 99.9% bacteria, fungal spores, and odor molecules on armrests & headrests.',
                },
                {
                  stage: 'Stage 05',
                  title: 'Wheel & Base Detailing',
                  detail: 'Hair/thread removal from caster axles, silicon lubrication & plastic body polish.',
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-sm relative overflow-hidden"
                >
                  <div className="text-xs font-extrabold text-emerald-600 uppercase mb-1">
                    {step.stage}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>

            {/* Volume Pricing Banner */}
            <div className="bg-[#13293D] text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Free On-Site Demo Offer
                </div>
                <div className="text-lg font-extrabold">
                  Have 50+ Chairs? We Will Deep-Clean 2 Sample Chairs at Your Office for Free!
                </div>
                <div className="text-xs text-slate-300">
                  See the dirty water extracted from your chairs before approving the bulk quotation.
                </div>
              </div>
              <button
                onClick={() => {
                  setServiceType('Old Chair Cleaning');
                  setActivePage('quote');
                }}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs whitespace-nowrap transition-all"
              >
                Book Free 2-Chair Demo &amp; Quote →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. CORPORATE AMC & BULK CONTROLLED BATCH PAGE */}
      {showSection('amc') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-1.5 h-10 bg-amber-500 rounded-full mt-1" />
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-600">
                REPEAT SERVICE &amp; RETENTION ENGINE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Corporate Annual Maintenance Contracts (AMC) &amp; Batch Execution
              </h2>
              <p className="text-sm text-slate-600">
                Built for IT Parks, Banks, Co-Working Spaces, Hospitals &amp; Universities that need zero workstation disruption.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Quarterly Preventive Care AMC',
                price: '₹320',
                period: 'per chair / year',
                badge: 'Popular for 100+ Chairs',
                features: [
                  '4 Scheduled Quarterly On-Site Technician Visits',
                  'Complete bolt torque-tightening & wheel hair cleaning',
                  'Tilt mechanism lubrication & pneumatic height check',
                  '1 Annual Bio-Enzymatic Deep Shampoo Extraction included',
                  'Barcode asset tagging on every chair',
                ],
                highlight: false,
              },
              {
                name: 'Comprehensive Zero-Cost Spares AMC',
                price: '₹590',
                period: 'per chair / year',
                badge: 'Best Corporate Value',
                features: [
                  'Everything in Preventive Care AMC + 2x Deep Cleanings/Year',
                  '100% FREE replacement of failed Hydraulic Gas Lifts',
                  '100% FREE replacement of broken Caster Wheels & Armpads',
                  'Priority 24-Hour breakdown response for facility teams',
                  'Batch Before/After Photo Proof & Quarterly Audit Report',
                ],
                highlight: true,
              },
              {
                name: 'One-Time Controlled Batch Overhaul',
                price: 'Custom',
                period: 'per batch assessment',
                badge: 'Ideal First Job',
                features: [
                  'Complete site inspection & defect tally by floor',
                  'Executed in batches of 50–80 chairs over weekends',
                  'Full fabric/leatherette re-upholstery & 55D molded foam',
                  '12 to 24 Months warranty on all replaced BIFMA parts',
                  'Automatic 6-month follow-up check included',
                ],
                highlight: false,
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-7 border flex flex-col justify-between transition-all ${
                  plan.highlight
                    ? 'bg-[#13293D] text-white border-emerald-400 shadow-xl scale-[1.01]'
                    : 'bg-white text-slate-900 border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold mb-4 ${
                      plan.highlight
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {plan.badge}
                  </span>
                  <h3 className="text-xl font-extrabold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-3xl font-extrabold text-emerald-500">{plan.price}</span>
                    <span className={`text-xs ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                      {plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.highlight ? 'text-emerald-400' : 'text-emerald-600'
                          }`}
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setServiceType('Corporate AMC');
                    setActivePage('quote');
                  }}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition-all ${
                    plan.highlight
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                      : 'bg-[#13293D] hover:bg-slate-800 text-white'
                  }`}
                >
                  Request Corporate AMC Proposal →
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. COMPLETED WORK WITH BEFORE/AFTER PHOTOS (INTERACTIVE SLIDERS) */}
      {showSection('work') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-10 bg-emerald-600 rounded-full mt-1" />
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                  VERIFIED BATCH PHOTO PROOF
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Our Completed Work — Interactive Before &amp; After Proof
                </h2>
                <p className="text-sm text-slate-600">
                  Drag the comparison slider on each corporate batch job to inspect our restoration quality.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {BEFORE_AFTER_CASES.map((project) => (
              <BeforeAfterSlider key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* 6. PRODUCTS SUPPLIED & SPARE PARTS PAGE ("ALSO SHOWN" IN PDF) */}
      {showSection('products') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-1.5 h-10 bg-[#13293D] rounded-full mt-1" />
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                SECONDARY SUPPLY CATALOGUE (ALSO SHOWN)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Heavy-Duty Chair Spare Parts &amp; Bulk New Chair Supply
              </h2>
              <p className="text-sm text-slate-600">
                Need BIFMA-certified spare parts in bulk or brand-new ergonomic seating for a new office expansion?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                category: 'Genuine Spare Part',
                name: 'ANSI/BIFMA Class-4 Hydraulic Cylinder',
                spec: '150kg rated chrome gas spring • 24M Warranty',
                price: '₹480',
                unit: 'per unit (Bulk 20+)',
              },
              {
                category: 'Genuine Spare Part',
                name: 'Heavy-Duty Chrome 5-Star Base (650mm)',
                spec: '1.8mm thick welded steel + 5 twin PU casters',
                price: '₹1,150',
                unit: 'complete base kit',
              },
              {
                category: 'New Corporate Supply',
                name: 'ErgoPro Matrix High-Back Mesh Chair',
                spec: '3D armrests, adjustable lumbar, synchro-tilt + 3Yr AMC',
                price: '₹5,400',
                unit: 'corporate bulk rate',
              },
              {
                category: 'New Corporate Supply',
                name: 'Apex Director Leatherette Executive Chair',
                spec: 'Double-cushioned 55D foam, knee-tilt lock, aluminum base',
                price: '₹7,800',
                unit: 'corporate bulk rate',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                    {item.category}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-3 mb-1">{item.name}</h4>
                  <p className="text-xs text-slate-500 mb-4">{item.spec}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-extrabold text-slate-900">{item.price}</div>
                    <div className="text-xs text-slate-400">{item.unit}</div>
                  </div>
                  <button
                    onClick={() => {
                      setServiceType('New Chairs & Spares');
                      setActivePage('quote');
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold transition-all"
                  >
                    Enquire Bulk
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. QUOTE REQUEST FORM WITH CHAIR PHOTOS & QUANTITY */}
      {showSection('quote') && (
        <section id="quote-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border-2 border-emerald-500/30 shadow-xl overflow-hidden">
            <div className="bg-[#13293D] text-white p-6 sm:p-8 border-b-4 border-amber-500">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-400 mb-1">
                    <Camera className="w-4 h-4" /> Connected Live to Team Service CRM
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold">
                    Request a Bulk Repair / Cleaning Quote with Chair Photos
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Share your approximate chair quantity and photos. Submitting this form adds your enquiry directly to the Team Management Dashboard!
                  </p>
                </div>
                <div className="bg-white/10 px-4 py-2.5 rounded-2xl text-right">
                  <div className="text-xs text-slate-300">Estimated Response</div>
                  <div className="text-sm font-extrabold text-amber-400">Under 30 Minutes</div>
                </div>
              </div>
            </div>

            {submittedBanner && (
              <div className="bg-emerald-50 border-b border-emerald-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-emerald-950 text-sm">
                      Enquiry &amp; Chair Photos Logged in Team Service Management System!
                    </h4>
                    <p className="text-xs text-emerald-800">
                      Switch to the Team Service CRM view right now to inspect, quote, and schedule this exact enquiry.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onSwitchToCrm}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold whitespace-nowrap shadow"
                >
                  Open in Team CRM Now →
                </button>
              </div>
            )}

            <form onSubmit={handleQuoteSubmit} className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Zoho Tech Park / Horizon Corp"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person &amp; Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Neha Sharma (Admin Head)"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98XXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Service Requirement *
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as Enquiry['serviceType'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Repair + Deep Cleaning">Bulk Chair Repair + Deep Cleaning</option>
                    <option value="Bulk Repair">Bulk Chair Repair Only</option>
                    <option value="Old Chair Cleaning">Old Chair Bio-Cleaning Only</option>
                    <option value="Corporate AMC">Annual Maintenance Contract (AMC)</option>
                    <option value="Refurbishment">Full Upholstery &amp; Cushion Refurbishment</option>
                    <option value="New Chairs & Spares">Spare Parts / New Chairs Supply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Total Chair Quantity: <span className="text-emerald-600 font-extrabold">{chairQuantity} Chairs</span>
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={5000}
                    value={chairQuantity}
                    onChange={(e) => setChairQuantity(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Office Location / Floor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Whitefield / CyberCity Floor 6"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Chair Photo Upload & Sample Preset Adder */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-dashed border-emerald-400">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <label className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                      <Upload className="w-4 h-4" /> Attach Chair Photos for Instant Assessment ({photoDescriptions.length} Attached)
                    </label>
                    <p className="text-xs text-slate-500">
                      Click to add sample chair defect photos or upload from your device/WhatsApp.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Broken Caster Wheel Close-up.jpg',
                      'Executive Leather Peeling.jpg',
                      'Floor Bay 80 Chairs Overview.jpg',
                    ].map((sample) => (
                      <button
                        type="button"
                        key={sample}
                        onClick={() => handleAddPresetPhoto(sample)}
                        className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-emerald-500 text-xs font-semibold text-slate-700"
                      >
                        + {sample}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {photoDescriptions.map((photo, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-semibold"
                    >
                      <Camera className="w-3.5 h-3.5 text-emerald-700" />
                      {photo}
                      <button
                        type="button"
                        onClick={() =>
                          setPhotoDescriptions(photoDescriptions.filter((_, i) => i !== index))
                        }
                        className="text-emerald-700 hover:text-rose-600 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-slate-500">
                  Selected Components/Issues:{' '}
                  <strong className="text-slate-800">{selectedParts.length} types</strong> • Auto-calculated Batch Size:{' '}
                  <strong className="text-emerald-700">{Math.ceil(chairQuantity / 60)} Batches</strong>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#0F9D76] hover:bg-emerald-700 text-white font-extrabold text-sm shadow-glow-emerald flex items-center justify-center gap-2 transition-all"
                >
                  <span>Submit Quote &amp; Send to Team CRM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};
