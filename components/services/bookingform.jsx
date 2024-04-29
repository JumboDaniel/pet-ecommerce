"use client";
import { useState } from "react";
///file import
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { createClient } from "@/utils/supabase/client";
import { BookAppointment } from "@/app/services/[slug]/actions";
import { LoadingOverlay } from "@/components/loading";

export function BookingForm({ product_name, product_id }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const handleBookApointment = async (formdata) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to use the cart",
        variant: "destructive",
        action: (
          <ToastAction altText="Login">
            <Link href={`/auth/login`}>Login</Link>
          </ToastAction>
        ),
      });
    } else {
      setIsLoading((prev) => !prev);

      await BookAppointment(formdata, product_name, product_id)
        .then((res) => {
          setIsLoading((prev) => !prev);
          toast({
            title: "Success",
            description: res.message,
          });
        })
        .catch((err) => {
          setIsLoading((prev) => !prev);
          toast({
            title: "Error",
            description: err.message,
            variant: "destructive",
            action: <ToastAction altText="Login">Try Again</ToastAction>,
          });
        });
    }
  };
  return (
    <form className="grid grid-cols-2 gap-4">
      <LoadingOverlay isLoading={isLoading} />

      <div className="space-y-2">
        <Label htmlFor="name" className="text-paws-gold">Name</Label>
        <Input id="name" placeholder="Enter your name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="breed" className="text-paws-gold">Breed</Label>
        <Input
          id="breed"
          placeholder="Enter your pet's breed"
          name="breed"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="age" className="text-paws-gold">Age</Label>
        <Input
          id="age"
          placeholder="Enter your pet's age"
          type="number"
          name="age"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="size" className="text-paws-gold">Size</Label>
        <Select id="size" name="size" required>
          <SelectTrigger>
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-full col-span-2 bg-[#e5f973] hover:bg-[#e5f973]/90 text-[#0b3339]"
        variant="primary"
        formAction={handleBookApointment}
      >
        Schedule Appointment
      </Button>
    </form>
  );
}
