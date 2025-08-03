"use client";

import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
import React from "react";

// This file is part of the authentication flow for signing in users.
// It imports the AuthForm component, the signInWithCredentials action, and the signInSchema validation schema.
// The Page component renders the AuthForm with the necessary props for signing in.
const Page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
}; //This component handles the sign in ui

export default Page;
