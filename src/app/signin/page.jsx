import React, { Suspense } from "react";
import SignUpPage from "../signup/page";
import SignInClientPage from "@/components/SignInClient";

const SignInPage = () => {
  return (
    <div>
      <Suspense>
        <SignInClientPage />
      </Suspense>
    </div>
  );
};

export default SignInPage;
