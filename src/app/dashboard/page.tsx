"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { motion } from "motion/react";
import {
  Camera,
  Loader2,
  User,
  Mail,
  Calendar,
  Crown,
  LogOut,
  Home,
  Settings,
  CreditCard,
  Chrome,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

interface UserSubscription {
  id: string;
  plan_type: string;
  status: string;
  started_at: string;
  expires_at: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [supabase, setSupabase] = useState<ReturnType<
    typeof createClient
  > | null>(null);

  // Initialize Supabase
  useEffect(() => {
    try {
      setSupabase(createClient());
    } catch (error) {
      console.error("Failed to initialize Supabase:", error);
    }
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, authLoading, router]);

  // Fetch user profile and subscription
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !supabase) return;

      try {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch subscription
        const { data: subscriptionData, error: subscriptionError } =
          await supabase
            .from("subscriptions")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

        if (subscriptionError) throw subscriptionError;
        setSubscription(subscriptionData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, supabase]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const handleExtensionClick = () => {
    window.open(
      "https://chromewebstore.google.com/detail/mnaeoccblgmbchggojbhijgeidlnnpmm?utm_source=item-share-cb",
      "_blank"
    );
  };

  // Show loading while checking auth
  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Don't render if not logged in (will redirect)
  if (!user) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navbar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-dark">ILoveSnapshots</span>
            </button>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-gray-600 hidden sm:block">
                {user.user_metadata.full_name}
              </span>
              <Button variant="outline" size="md" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-dark mb-2">
                Welcome back, {profile?.full_name || "User"}! 👋
              </h1>
              <p className="text-gray-600">
                Here&apos;s an overview of your account and subscription.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                size="md"
                variant="secondary"
                onClick={() => router.push("/editor")}
                className="flex items-center gap-2"
              >
                <Monitor className="w-4 h-4" />
                Open Web Editor
              </Button>
              <Button
                size="md"
                onClick={handleExtensionClick}
                className="flex items-center gap-2"
              >
                <Chrome className="w-4 h-4" />
                Get Extension
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-card p-6 border-2 border-gray-100 hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-coral to-peach flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-dark">Profile</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 truncate">{profile?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {profile?.full_name || "No name set"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  Joined{" "}
                  {profile?.created_at ? formatDate(profile.created_at) : "N/A"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Subscription Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-card p-6 border-2 border-gray-100 hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal to-secondary flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-dark">Subscription</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Plan:</span>
                <span className="text-sm font-semibold text-primary capitalize">
                  {subscription?.plan_type || "Free"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span
                  className={`text-sm font-semibold capitalize ${
                    subscription?.status === "active"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  {subscription?.status || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Started:</span>
                <span className="text-sm text-gray-600">
                  {subscription?.started_at
                    ? formatDate(subscription.started_at)
                    : "N/A"}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-card p-6 border-2 border-gray-100 hover:shadow-card-hover transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-peach flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-dark">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => router.push("/")}
                className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors py-2"
              >
                <Home className="w-4 h-4" />
                Go to Landing Page
              </button>
              <button
                className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors py-2"
                onClick={() => alert("Profile settings coming soon!")}
              >
                <User className="w-4 h-4" />
                Edit Profile
              </button>
              <button
                className="w-full flex items-center gap-2 text-sm text-gray-700 hover:text-primary transition-colors py-2"
                onClick={() => alert("Upgrade plan coming soon!")}
              >
                <CreditCard className="w-4 h-4" />
                Upgrade Plan
              </button>
            </div>
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-card p-8 border-2 border-gray-100"
        >
          <h2 className="text-2xl font-bold text-dark mb-4">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-dark">Next Steps</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-600">
                    Account created successfully
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-gray-600">Free plan activated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">○</span>
                  <span className="text-gray-600">
                    Install Chrome extension
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-400 mt-1">○</span>
                  <span className="text-gray-600">
                    Take your first screenshot
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-dark">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.youtube.com/@IloveSnapshots"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-left"
                  >
                    → View documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@IloveSnapshots"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-left"
                  >
                    → Watch tutorial videos
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/THEBOSS036"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-left"
                  >
                    → Join our community
                  </a>
                </li>
                <li>
                  <a
                    href="/support"
                    className="text-primary hover:underline text-left"
                  >
                    → Contact support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-primary rounded-2xl shadow-colorful p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-3">Ready to upgrade?</h2>
          <p className="mb-6 text-white/90">
            Unlock premium features and get unlimited screenshots with our Pro
            plan
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100"
            onClick={() => alert("Upgrade flow coming soon!")}
          >
            <Crown className="w-5 h-5 mr-2" />
            Upgrade to Pro
          </Button>
        </motion.div>
      </div>

    </div>
  );
}
