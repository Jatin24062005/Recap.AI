"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios"; // Adjust the import path as necessar
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookie from "js-cookie"; // Import js-cookie to manage cookies
import { useUser } from "@/context/AuthContext";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const token = Cookie.get("token"); // Get token from cookies

  const handleloginSubmit = async () => {
    try {
      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
      const response = await axiosInstance.post("/user/login", {
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 200) {
        toast.success("Login successful");
        const token = response?.data?.token; // Assuming the token is returned in the response
        Cookie.set("token", token, {
          expires: 7,
        });
        router.push("/"); // Redirect to the dashboard or home page
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed");
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/"); // Redirect to the home page if already logged in
    }
  }, [token, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleloginSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="underline underline-offset-4"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
