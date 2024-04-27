"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error, data: response } = await supabase.auth.signInWithPassword(
    data
  );
  // console.log(error, data)
  //   if (error) {
  //     redirect('/error')
  //   }
  if (error) {
    const loginResult = {
      error: true,
      errorMessage: error.message,
      response: null,
    };
    return loginResult; // Return the error object
  }
  const loginResult = {
    error: false,
    response: "Login Successfull, redirecting",
  };
  return loginResult; // Return the success object
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const first_name = formData.get("firstname") as string;
  const last_name = formData.get("lastname") as string;
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error, data: signupdata } = await supabase.auth.signUp(data);

  if (error) {
    const signUpResult = {
      error: true,
      errorMessage: error.message,
      response: null,
    };
    return signUpResult; // Return the error object
  }
  const signUpResult = {
    error: false,
    response: "Login Successfull, redirecting",
  };
  const {
    error: insertError,
    data: insertData,
    status,
  } = await supabase.from("users").insert([
    {
      uid: signupdata.user?.id, // Store the Supabase user ID
      first_name: first_name,
      last_name: last_name,
      email: signupdata.user?.email,
    },
  ]);
  if (insertError) {
    console.error("Error inserting user data:", insertError.message);
  }
  return signUpResult; // Return the success object
}
