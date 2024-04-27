"use client";

import Link from "next/link";
// import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { useState } from "react";
import { signup } from "../actions";

////
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

export default function Signup() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
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
    const response = await signup(formdata);
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
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>

                <Input
                  id="firstname"
                  placeholder="Jon"
                  required
                  value={userData.firstname}
                  name="firstname"
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="lastname"
                  placeholder="Doe"
                  required
                  value={userData.lastname}
                  name="lastname"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={userData.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                onChange={handleInputChange}
                value={userData.password}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-paws-darkblue"
              formAction={handleSubmit}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
