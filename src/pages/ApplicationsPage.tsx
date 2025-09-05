import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { FileText, Building2, Calendar, Eye, Trash2 } from 'lucide-react';

interface Application {
  id: string;
  internshipId: string;
  companyName: string;
  jobTitle: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  appliedAt: string;
  location: string;
  stipend: number;
}

export const ApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock applications data
  const mockApplications: Application[] = [
    {
      id: '1',
      internshipId: 'INT001',
      companyName: 'Tech Solutions India',
      jobTitle: 'Software Development Intern',
      status: 'pending',
      appliedAt: '2024-01-15T10:30:00Z',
      location: 'Bangalore, Karnataka',
      stipend: 25000,
    },
    {
      id: '2',
      internshipId: 'INT002',
      companyName: 'Digital India Corp',
      jobTitle: 'Data Analytics Intern',
      status: 'reviewed',
      appliedAt: '2024-01-12T14:20:00Z',
      location: 'New Delhi',
      stipend: 22000,
    },
    {
      id: '3',
      internshipId: 'INT003',
      companyName: 'Green Energy Solutions',
      jobTitle: 'Research Intern',
      status: 'accepted',
      appliedAt: '2024-01-10T09:15:00Z',
      location: 'Mumbai, Maharashtra',
      stipend: 20000,
    },
    {
      id: '4',
      internshipId: 'INT004',
      companyName: 'FinTech Innovations',
      jobTitle: 'Marketing Intern',
      status: 'rejected',
      appliedAt: '2024-01-08T16:45:00Z',
      location: 'Pune, Maharashtra',
      stipend: 18000,
    },
  ];

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        // Mock API call - replace with actual endpoint
        await new Promise(resolve => setTimeout(resolve, 1000));
        setApplications(mockApplications);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load applications. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending Review</Badge>;
      case 'reviewed':
        return <Badge variant="secondary">Under Review</Badge>;
      case 'accepted':
        return <Badge className="bg-success text-success-foreground">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleWithdrawApplication = async (applicationId: string, companyName: string) => {
    try {
      // Mock API call to withdraw application
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setApplications(prev => prev.filter(app => app.id !== applicationId));
      toast({
        title: 'Application Withdrawn',
        description: `Your application to ${companyName} has been withdrawn successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to withdraw application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusCounts = () => {
    const counts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: applications.length,
      pending: counts.pending || 0,
      reviewed: counts.reviewed || 0,
      accepted: counts.accepted || 0,
      rejected: counts.rejected || 0,
    };
  };

  const statusCounts = getStatusCounts();

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
          <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
          <p className="text-muted-foreground">
            Track the status of your internship applications
          </p>
        </div>
      </div>

      {/* Application Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{statusCounts.total}</div>
            <p className="text-xs text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{statusCounts.pending}</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{statusCounts.reviewed}</div>
            <p className="text-xs text-muted-foreground">Under Review</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{statusCounts.accepted}</div>
            <p className="text-xs text-muted-foreground">Accepted</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{statusCounts.rejected}</div>
            <p className="text-xs text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      {applications.length > 0 ? (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <span>Application History</span>
            </CardTitle>
            <CardDescription>
              Your submitted internship applications and their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company & Role</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Stipend</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{application.companyName}</span>
                        </div>
                        <p className="text-sm text-foreground">{application.jobTitle}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(application.appliedAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{application.location}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ₹{application.stipend.toLocaleString('en-IN')}/month
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(application.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        {application.status === 'pending' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleWithdrawApplication(application.id, application.companyName)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No Applications Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              You haven't applied to any internships yet. Visit the dashboard to find recommendations.
            </p>
            <Button variant="accent">
              Find Internships
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};