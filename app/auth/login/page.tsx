"use client";

import Link from "next/link";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useState } from "react";

////file import
import { login } from "../actions";
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
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function LoginForm() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.target.name, e.target.value);
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(formdata: FormData) {
    setIsLoading((prev) => !prev);
    const response = await login(formdata);
    if (response.error) {
      toast({
        title: "Error",
        description: response.errorMessage,
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsLoading((prev) => !prev);
    } else {
      toast({
        title: "Success",
        description: "Login successfull, redirecting",
      });
      setIsLoading((prev) => !prev);
      // revalidatePath('/', 'layout')
      redirect("/");
    }
  }

  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={userData.email} // Set value prop with state data
                name="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                value={userData.password}
                onChange={handleInputChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-paws-darkblue"
              formAction={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
          <div className="flex items-end my-2">
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
