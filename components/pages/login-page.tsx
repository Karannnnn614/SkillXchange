'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/app-context';
import { useToast } from '@/hooks/use-toast';
import { Crown, User, Shield } from 'lucide-react';

export function LoginPage() {
  const router = useRouter();
  const { setIsLoggedIn, setCurrentScreen, setCurrentUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDemoLogin = async (email: string, password: string, userType: string) => {
    console.log('Demo login attempt:', userType, email);
    setLoading(true);
    try {
      const response = await fetch('/api/auth/test-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('API Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, user:', data.user);
        setCurrentUser(data.user);
        setIsLoggedIn(true);

        // Navigate based on user role using Next.js router
        if (data.user.role === 'admin') {
          console.log('Navigating to admin...');
          router.push('/admin');
        } else {
          console.log('Navigating to dashboard...');
          router.push('/dashboard');
        }

        toast({
          title: 'Success!',
          description: `Logged in as demo ${userType}`,
        });
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        throw new Error(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Demo login error:', error);
      toast({
        title: 'Error',
        description: 'Demo login failed. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManualLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setLoading(true);
    try {
      const response = await fetch('/api/auth/test-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        setIsLoggedIn(true);

        if (data.user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }

        toast({
          title: 'Success!',
          description: 'Logged in successfully',
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-blue-700">Welcome back</h2>
          <p className="mt-2 text-sm text-purple-600">Sign in to your SkillXchange account</p>
        </div>
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form className="space-y-6" onSubmit={handleManualLogin}>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="mt-1"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={loading}
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                  </div>
                  <div className="text-center">
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </form>

                <Separator className="my-4" />
                <div className="flex gap-4">
                  <Button
                    type="button"
                    onClick={() => handleDemoLogin('admin@skillxchange.com', 'admin123', 'admin')}
                    className="flex-1"
                    variant="outline"
                    disabled={loading}
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    {loading ? 'Loading...' : 'Demo Admin'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDemoLogin('emily.watson@email.com', 'user123', 'user')}
                    className="flex-1"
                    variant="outline"
                    disabled={loading}
                  >
                    <User className="mr-2 h-5 w-5" />
                    {loading ? 'Loading...' : 'Demo User'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoggedIn(true);
                    setCurrentScreen('profile');
                  }}
                >
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="mt-1"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      required
                      className="mt-1"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      required
                      className="mt-1"
                      placeholder="Create a password"
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
