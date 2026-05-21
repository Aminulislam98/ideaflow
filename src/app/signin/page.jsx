import React, { Suspense } from "react";
import SignUpPage from "../signup/page";

const SignInPage = () => {
  return (
    <div>
      <Suspense>
        <SignUpPage />
      </Suspense>
    </div>
  );
};

export default SignInPage;
