import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  FileText, 
  CheckSquare, 
  TrendingUp, 
  Settings, 
  Play 
} from 'lucide-react';

interface DashboardStats {
  totalCandidates: number;
  totalApplications: number;
  allocationsCompleted: number;
  pendingAllocations: number;
}

interface Allocation {
  id: string;
  candidateId: string;
  candidateName: string;
  companyName: string;
  jobTitle: string;
  status: 'allocated' | 'confirmed' | 'pending';
}

export const AdminDashboard: React.FC = () => {
  const [isRunningAllocation, setIsRunningAllocation] = useState(false);
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const { toast } = useToast();

  const stats: DashboardStats = {
    totalCandidates: 1247,
    totalApplications: 3891,
    allocationsCompleted: 892,
    pendingAllocations: 355,
  };

  const mockAllocations: Allocation[] = [
    {
      id: '1',
      candidateId: 'CAND001',
      candidateName: 'Rahul Sharma',
      companyName: 'Tech Solutions India',
      jobTitle: 'Software Development Intern',
      status: 'allocated',
    },
    {
      id: '2',
      candidateId: 'CAND002',
      candidateName: 'Priya Patel',
      companyName: 'Digital India Corp',
      jobTitle: 'Data Analytics Intern',
      status: 'confirmed',
    },
    {
      id: '3',
      candidateId: 'CAND003',
      candidateName: 'Amit Kumar',
      companyName: 'Green Energy Solutions',
      jobTitle: 'Research Intern',
      status: 'pending',
    },
  ];

  const handleRunAllocation = async () => {
    setIsRunningAllocation(true);
    try {
      // Mock API call to run allocation algorithm
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setAllocations(mockAllocations);
      toast({
        title: 'Allocation Completed',
        description: `Successfully allocated ${mockAllocations.length} candidates to internships.`,
      });
    } catch (error) {
      toast({
        title: 'Allocation Failed',
        description: 'Failed to run allocation algorithm. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsRunningAllocation(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'allocated':
        return <Badge variant="secondary">Allocated</Badge>;
      case 'confirmed':
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage internship allocations and monitor application progress.
          </p>
        </div>
        <Button
          variant="accent"
          size="lg"
          onClick={handleRunAllocation}
          disabled={isRunningAllocation}
          className="flex items-center space-x-2"
        >
          {isRunningAllocation ? (
            <>
              <div className="loading-spinner w-4 h-4" />
              <span>Running Allocation...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Run Allocation</span>
            </>
          )}
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalCandidates.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.totalApplications.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Allocations Completed</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.allocationsCompleted.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +23% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Allocations</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {stats.pendingAllocations.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              -5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Allocation Results */}
      {allocations.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>Recent Allocation Results</span>
            </CardTitle>
            <CardDescription>
              Latest results from the AI-powered allocation system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate ID</TableHead>
                  <TableHead>Candidate Name</TableHead>
                  <TableHead>Allocated Company</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocations.map((allocation) => (
                  <TableRow key={allocation.id}>
                    <TableCell className="font-medium">
                      {allocation.candidateId}
                    </TableCell>
                    <TableCell>{allocation.candidateName}</TableCell>
                    <TableCell>{allocation.companyName}</TableCell>
                    <TableCell>{allocation.jobTitle}</TableCell>
                    <TableCell>{getStatusBadge(allocation.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* System Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks and operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              View All Candidates
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Export Applications Report
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              <CheckSquare className="w-4 h-4 mr-2" />
              Review Pending Applications
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current status of the allocation system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Allocation Engine</span>
              <Badge className="bg-success text-success-foreground">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Database Sync</span>
              <Badge className="bg-success text-success-foreground">Active</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Last Allocation Run</span>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};