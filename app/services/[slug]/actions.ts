//@ts-nocheck
"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export async function BookAppointment(
  formData: FormData,
  product_name: string,
  product_id: number
) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const name = formData.get("name");
  const breed = formData.get("breed");
  const age = parseInt(formData.get("age")?.toString());
  const size = formData.get("size");
  const data = {
    name,
    breed,
    age,
    size,
    product_id,
    product_name,
  };
  console.log(data);
  try {
    const { data: appointmentData, error } = await supabase
      .from("appointment")
      .insert([{ name, breed, age, size, product_id, product_name }])
      .select();

    if (error) {
      console.error("Error inserting appointment:", error);
      return { message: "Failed to create appointment" };
    }
    return { message: "Appointment created successfully" };
  } catch (error) {
    console.error("Error creating appointment:", error);
    return { error: "Failed to create appointment" };
  }
}
