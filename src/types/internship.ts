export interface Internship {
  id: string;
  companyName: string;
  jobTitle: string;
  description: string;
  location: string;
  duration: string;
  stipend: number;
  requirements: string[];
  isActive: boolean;
}

export interface InternshipRecommendation {
  internship: Internship;
  matchScore: number;
  matchReasons: string[];
}

export interface Application {
  id: string;
  candidateId: string;
  internshipId: string;
  internship: Internship;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  notes?: string;
}

export interface Allocation {
  id: string;
  candidateId: string;
  candidateName: string;
  internshipId: string;
  internship: Internship;
  status: 'allocated' | 'pending' | 'confirmed';
  allocatedAt: string;
}