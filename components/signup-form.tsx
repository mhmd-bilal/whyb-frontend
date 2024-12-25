"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { authApi } from "@/utils/api";
import { Eye, EyeOff } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isView, setIsView] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const isValidUsername = (value: string) => /^[a-z0-9_]+$/.test(value);
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isValidPassword = (value: string): boolean => value.length >= 8
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!isValidUsername(username)) {
      setError(
        "Username should only contain lowercase letters, numbers, and underscores."
      );
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password should be atleast 8 characters.");
      return;
    }

    setError(null);

    const userData = {
      name,
      username,
      email,
      password,
      bio,
    };

    try {
      const response = await authApi.signup(userData);
      toast({
        description: "Account created successfully!",
      });
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          description: error.message,
        });
        console.error(error.message);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Phil Dunphy"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username" required>
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="thephil"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="phildunphy@yeehaw.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" required>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={isView ? "text" : "password"}
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {isView ? (
                    <Eye
                      size={20}
                      className="absolute right-2 top-2 z-10 cursor-pointer text-sm text-[#696562]"
                      onClick={() => setIsView(!isView)}
                    />
                  ) : (
                    <EyeOff
                      size={20}
                      className="absolute right-2 top-2 z-10 cursor-pointer text-sm text-[#696562]"
                      onClick={() => setIsView(!isView)}
                    />
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                {error && <p className="text-red-500 text-sm py-2">{error}</p>}
                <Button variant="outline" className="w-full" disabled>
                  Sign Up with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
