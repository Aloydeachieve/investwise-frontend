import { User } from './user';

export type VerificationStatus = 'pending' | 'approved' | 'rejected';
export type DocumentType = 'NIN' | 'Passport' | 'Drivers License' | 'BVN';

export interface Verification {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    country: string;
  };
  documentType: DocumentType;
  documentUrl: string; // URL to the document image
  submittedAt: string;
  status: VerificationStatus;
}