import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckSquare, 
  Building2, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Clock,
  Mail,
  Phone,
  FileText
} from 'lucide-react';

interface Allotment {
  id: string;
  candidateId: string;
  internshipId: string;
  companyName: string;
  jobTitle: string;
  status: 'allocated' | 'confirmed' | 'pending';
  allocatedAt: string;
  location: string;
  duration: string;
  stipend: number;
  startDate: string;
  endDate: string;
  companyContact: {
    name: string;
    email: string;
    phone: string;
  };
  description: string;
}

export const AllotmentPage: React.FC = () => {
  const [allotment, setAllotment] = useState<Allotment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock allotment data
  const mockAllotment: Allotment = {
    id: '1',
    candidateId: user?.candidateId || 'CAND001',
    internshipId: 'INT001',
    companyName: 'Tech Solutions India',
    jobTitle: 'Software Development Intern',
    status: 'allocated',
    allocatedAt: '2024-01-20T10:30:00Z',
    location: 'Bangalore, Karnataka',
    duration: '6 months',
    stipend: 25000,
    startDate: '2024-02-01',
    endDate: '2024-07-31',
    companyContact: {
      name: 'Mr. Rajesh Kumar',
      email: 'rajesh.kumar@techsolutions.in',
      phone: '+91 98765 43210',
    },
    description: 'Work on cutting-edge web applications using React and Node.js. You will be part of a dynamic team working on government digitization projects.',
  };

  useEffect(() => {
    const fetchAllotment = async () => {
      setIsLoading(true);
      try {
        // Mock API call - replace with actual endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate allocation result (75% chance of having allocation)
        if (Math.random() > 0.25) {
          setAllotment(mockAllotment);
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load allotment details. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllotment();
  }, [toast, user?.candidateId]);

  const handleConfirmAllotment = async () => {
    if (!allotment) return;

    try {
      // Mock API call to confirm allotment
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAllotment(prev => prev ? { ...prev, status: 'confirmed' } : null);
      toast({
        title: 'Allotment Confirmed',
        description: 'You have successfully confirmed your internship allotment.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to confirm allotment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'allocated':
        return <Badge variant="secondary">Allocated - Pending Confirmation</Badge>;
      case 'confirmed':
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending Allocation</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="loading-spinner w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Allotment Status</h1>
          <p className="text-muted-foreground">
            View your internship allocation details and status
          </p>
        </div>
      </div>

      {allotment ? (
        <div className="space-y-6">
          {/* Status Card */}
          <Card className="shadow-card border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CheckSquare className="w-5 h-5 text-primary" />
                  <span>Internship Allocated</span>
                </CardTitle>
                {getStatusBadge(allotment.status)}
              </div>
              <CardDescription>
                Congratulations! You have been allocated an internship position.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Allotment Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Company & Role Details */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span>Internship Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{allotment.companyName}</h3>
                  <p className="text-primary font-medium">{allotment.jobTitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{allotment.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{allotment.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="w-4 h-4 text-muted-foreground" />
                    <span>₹{allotment.stipend.toLocaleString('en-IN')}/month</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{formatDate(allotment.startDate)}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Job Description</h4>
                  <p className="text-sm text-muted-foreground">{allotment.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Timeline */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Company Contact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span>{allotment.companyContact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={`mailto:${allotment.companyContact.email}`}
                        className="text-primary hover:underline"
                      >
                        {allotment.companyContact.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a 
                        href={`tel:${allotment.companyContact.phone}`}
                        className="text-primary hover:underline"
                      >
                        {allotment.companyContact.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Important Dates</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allocated:</span>
                      <span>{formatDate(allotment.allocatedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Start Date:</span>
                      <span className="font-medium">{formatDate(allotment.startDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">End Date:</span>
                      <span>{formatDate(allotment.endDate)}</span>
                    </div>
                  </div>
                </div>

                {allotment.status === 'allocated' && (
                  <div className="pt-4">
                    <Button
                      variant="accent"
                      size="lg"
                      onClick={handleConfirmAllotment}
                      className="w-full"
                    >
                      Confirm Allotment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        /* No Allotment State */
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No Allotment Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Your internship allocation is still pending. The system is processing applications and will update your status soon.
            </p>
            <div className="bg-muted rounded-lg p-4 text-left max-w-md mx-auto">
              <h4 className="font-medium text-foreground mb-2">Next Steps:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Applications are being reviewed</li>
                <li>• Allocation algorithm is matching candidates</li>
                <li>• Results will be available within 2-3 business days</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};