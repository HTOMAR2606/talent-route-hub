import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Shield, UserCheck, UserPlus } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'candidate' as 'candidate' | 'admin',
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    candidateId: '',
    role: 'candidate' as 'candidate' | 'admin',
  });

  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(loginData);
      toast({
        title: 'Login Successful',
        description: `Welcome back! Redirecting to your ${loginData.role} dashboard.`,
      });
      
      // Redirect based on role
      navigate(loginData.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(registerData);
      toast({
        title: 'Registration Successful',
        description: `Account created successfully! Redirecting to your ${registerData.role} dashboard.`,
      });
      
      // Redirect based on role
      navigate(registerData.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: 'Please check your information and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elevated">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              PM Internship Portal
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Government of India Initiative
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4" />
                <span>Login</span>
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Login As</Label>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant={loginData.role === 'candidate' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLoginData(prev => ({ ...prev, role: 'candidate' }))}
                      className="flex-1"
                    >
                      Candidate
                    </Button>
                    <Button
                      type="button"
                      variant={loginData.role === 'admin' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLoginData(prev => ({ ...prev, role: 'admin' }))}
                      className="flex-1"
                    >
                      Admin
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="govt"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="registerRole">Register As</Label>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant={registerData.role === 'candidate' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRegisterData(prev => ({ ...prev, role: 'candidate' }))}
                      className="flex-1"
                    >
                      Candidate
                    </Button>
                    <Button
                      type="button"
                      variant={registerData.role === 'admin' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setRegisterData(prev => ({ ...prev, role: 'admin' }))}
                      className="flex-1"
                    >
                      Admin
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                {registerData.role === 'candidate' && (
                  <div className="space-y-2">
                    <Label htmlFor="candidateId">Candidate ID</Label>
                    <Input
                      id="candidateId"
                      value={registerData.candidateId}
                      onChange={(e) => setRegisterData(prev => ({ ...prev, candidateId: e.target.value }))}
                      placeholder="e.g., CAND001"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="registerEmail">Email</Label>
                  <Input
                    id="registerEmail"
                    type="email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Password</Label>
                  <Input
                    id="registerPassword"
                    type="password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};