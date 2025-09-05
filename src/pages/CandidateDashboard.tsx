import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Search, Building2, MapPin, Clock, IndianRupee, ExternalLink } from 'lucide-react';

interface Recommendation {
  id: string;
  companyName: string;
  jobTitle: string;
  matchScore: number;
  description: string;
  location: string;
  duration: string;
  stipend: number;
}

export const CandidateDashboard: React.FC = () => {
  const [candidateId, setCandidateId] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Mock data for recommendations
  const mockRecommendations: Recommendation[] = [
    {
      id: '1',
      companyName: 'Tech Solutions India',
      jobTitle: 'Software Development Intern',
      matchScore: 92,
      description: 'Work on cutting-edge web applications using React and Node.js. Perfect for computer science students.',
      location: 'Bangalore, Karnataka',
      duration: '6 months',
      stipend: 25000,
    },
    {
      id: '2',
      companyName: 'Digital India Corp',
      jobTitle: 'Data Analytics Intern',
      matchScore: 87,
      description: 'Analyze government data to drive policy decisions. Experience with Python and SQL required.',
      location: 'New Delhi',
      duration: '4 months',
      stipend: 22000,
    },
    {
      id: '3',
      companyName: 'Green Energy Solutions',
      jobTitle: 'Research Intern',
      matchScore: 78,
      description: 'Research renewable energy solutions for rural India. Environmental science background preferred.',
      location: 'Mumbai, Maharashtra',
      duration: '5 months',
      stipend: 20000,
    },
  ];

  const handleGetRecommendations = async () => {
    if (!candidateId.trim()) {
      toast({
        title: 'Candidate ID Required',
        description: 'Please enter your candidate ID to get recommendations.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Mock API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      setRecommendations(mockRecommendations);
      toast({
        title: 'Recommendations Loaded',
        description: `Found ${mockRecommendations.length} internship recommendations for you.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load recommendations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (internshipId: string, companyName: string) => {
    try {
      // Mock API call for application
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Application Submitted',
        description: `Your application to ${companyName} has been submitted successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Application Failed',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-success';
    if (score >= 70) return 'bg-warning';
    return 'bg-muted';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return 'Excellent Match';
    if (score >= 70) return 'Good Match';
    return 'Fair Match';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Candidate Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Find your perfect internship match.
          </p>
        </div>
      </div>

      {/* Recommendation Search */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-primary" />
            <span>Get Personalized Recommendations</span>
          </CardTitle>
          <CardDescription>
            Enter your candidate ID to receive AI-powered internship recommendations tailored to your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="candidateId">Candidate ID</Label>
              <Input
                id="candidateId"
                value={candidateId}
                onChange={(e) => setCandidateId(e.target.value)}
                placeholder="Enter your candidate ID (e.g., CAND001)"
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="accent"
                size="lg"
                onClick={handleGetRecommendations}
                disabled={isLoading}
                className="flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner w-4 h-4" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Get Recommendations</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Table */}
      {recommendations.length > 0 && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Recommended Internships</CardTitle>
            <CardDescription>
              Internships matched to your profile and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company & Role</TableHead>
                  <TableHead>Match Score</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Stipend</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recommendations.map((rec) => (
                  <TableRow key={rec.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">{rec.companyName}</span>
                        </div>
                        <p className="text-sm text-foreground font-medium">{rec.jobTitle}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {rec.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{rec.matchScore}%</span>
                          <Badge variant="secondary" className="text-xs">
                            {getScoreBadge(rec.matchScore)}
                          </Badge>
                        </div>
                        <Progress
                          value={rec.matchScore}
                          className="w-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span>{rec.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span>{rec.duration}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">
                          {rec.stipend.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-muted-foreground">/month</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => handleApply(rec.id, rec.companyName)}
                        className="flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Apply</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {recommendations.length === 0 && !isLoading && (
        <Card className="shadow-card">
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No Recommendations Yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Enter your candidate ID above to get personalized internship recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};