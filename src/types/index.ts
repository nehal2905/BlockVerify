export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'verifier' | 'user';
  avatar?: string;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadDate: string;
  hash: string;
  size: number;
  tags: string[];
  verifiedBy?: string;
  verificationDate?: string;
}

export interface VerificationStep {
  id: string;
  title: string;
  completed: boolean;
  timestamp?: string;
}

export interface Analytics {
  totalUploads: number;
  totalVerifications: number;
  pendingRequests: number;
  rejectedDocuments: number;
}