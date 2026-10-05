export type AppMode = 'website' | 'crm' | 'blueprint';

export type CustomerPage =
  | 'home'
  | 'repair'
  | 'cleaning'
  | 'amc'
  | 'work'
  | 'products'
  | 'quote';

export type CrmTab =
  | 'enquiries'
  | 'inspections'
  | 'quotations'
  | 'jobs'
  | 'photos'
  | 'invoices'
  | 'reports';

export type EnquiryStatus =
  | 'New Enquiry'
  | 'Inspection Scheduled'
  | 'Quoted'
  | 'Approved - In Batch'
  | 'Completed & Invoiced';

export interface Enquiry {
  id: string;
  company: string;
  contactName: string;
  phone: string;
  email: string;
  location: string;
  chairQuantity: number;
  serviceType: 'Bulk Repair' | 'Old Chair Cleaning' | 'Repair + Deep Cleaning' | 'Corporate AMC' | 'Refurbishment' | 'New Chairs & Spares';
  issues: string[];
  photoCount: number;
  photoDescriptions: string[];
  status: EnquiryStatus;
  createdAt: string;
  nextFollowUp: string;
  source: 'Website Quote Form' | 'WhatsApp Photo Quote' | 'Instant Callback';
  estimatedValue: number;
  notes: string;
}

export interface SiteInspection {
  id: string;
  enquiryId: string;
  company: string;
  inspector: string;
  date: string;
  totalChairsInspected: number;
  gasLiftsNeeded: number;
  casterSetsNeeded: number;
  mechanismsNeeded: number;
  armrestPairsNeeded: number;
  deepCleaningNeeded: number;
  upholsteryRefurbNeeded: number;
  floorNotes: string;
  recommendedBatches: number;
}

export interface QuotationLineItem {
  id: string;
  description: string;
  hsnOrCode: string;
  qty: number;
  unitPrice: number;
}

export interface Quotation {
  id: string;
  enquiryId: string;
  company: string;
  contactName: string;
  date: string;
  validUntil: string;
  batchScheduleNote: string;
  warrantyNote: string;
  items: QuotationLineItem[];
  status: 'Draft' | 'Sent to Client' | 'Customer Approved';
}

export interface JobBatch {
  id: string;
  name: string;
  chairCount: number;
  status: 'Queued' | 'In Progress' | 'Completed';
  beforePhotosCaptured: boolean;
  afterPhotosCaptured: boolean;
}

export interface ServiceJob {
  id: string;
  enquiryId: string;
  quotationId: string;
  company: string;
  location: string;
  leadTechnician: string;
  crewMembers: number;
  startDate: string;
  totalChairs: number;
  completedChairs: number;
  status: 'Scheduled' | 'In Batch Execution' | 'Photo Proof Verified' | 'Completed';
  batches: JobBatch[];
}

export interface InvoiceRecord {
  id: string;
  jobId: string;
  company: string;
  chairCount: number;
  totalAmount: number;
  paidAmount: number;
  status: 'Paid in Full' | '50% Advance Paid' | 'Invoice Sent';
  invoiceDate: string;
  nextServiceFollowUp: string;
  amcEligible: boolean;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  clientSector: string;
  chairCount: number;
  serviceBadge: 'Bulk Repair & Spares' | 'Deep Foam & Mesh Cleaning' | 'Full Refurbishment' | 'Corporate AMC Batch';
  duration: string;
  savedVsNew: string;
  beforeSummary: string[];
  afterSummary: string[];
  quoteText: string;
  clientRole: string;
  accentColor: string;
}

export interface ChairPartHotspot {
  id: string;
  name: string;
  shortLabel: string;
  x: number;
  y: number;
  commonSymptom: string;
  solutionSpec: string;
  repairPrice: number;
  newChairComparison: string;
  warrantyMonths: number;
  repairTimeMins: number;
}
