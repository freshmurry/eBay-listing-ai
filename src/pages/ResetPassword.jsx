import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simulate password reset request
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to={createPageUrl("Home")} className="inline-flex items-center gap-3">
              <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                <i className="bi bi-stars text-2xl text-white"></i>
              </div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">eBay DescriptionAI</h1>
            </Link>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-[var(--border-color)] shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="bi bi-check-circle-fill text-3xl text-green-600"></i>
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Check Your Email</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <div className="space-y-4">
                <Link to={createPageUrl("Login")}>
                  <Button className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white">
                    Back to Login
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => setSuccess(false)}
                  className="w-full border-[var(--border-color)]"
                >
                  Try Different Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to={createPageUrl("Home")} className="inline-flex items-center gap-3">
            <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
              <i className="bi bi-stars text-2xl text-white"></i>
            </div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">eBay DescriptionAI</h1>
          </Link>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-[var(--border-color)] shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[var(--text-primary)]">
              Reset Password
            </CardTitle>
            <p className="text-center text-[var(--text-secondary)]">
              Enter your email to receive a password reset link
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <i className="bi bi-exclamation-circle h-4 w-4"></i>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-brand-primary hover:bg-brand-primary-hover text-white text-lg font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="text-center">
                <Link to={createPageUrl("Login")} className="text-brand-primary hover:underline">
                  <i className="bi bi-arrow-left mr-2"></i>
                  Back to Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}