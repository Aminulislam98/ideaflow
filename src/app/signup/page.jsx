import SignUpPageClient from "@/components/SignUpClient";
import React, { Suspense } from "react";

const SignUpPage = () => {
  return (
    <Suspense>
      <SignUpPageClient />
    </Suspense>
  );
};

export default SignUpPage;
