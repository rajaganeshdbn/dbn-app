import { Ui } from '@databrainhq/plugin';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const Verification = () => {
  const [isLoading, setLoading] = useState(true);
  const token = useParams().token;
  const { signUpVerification } = useAuth(() => setLoading(false));
  useEffect(() => {
    if (token) {
      setLoading(true);
      signUpVerification(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="dbn-w-full dbn-h-full dbn-flex dbn-justify-between dbn-items-center">
      {isLoading ? (
        <div className="dbn-w-[40rem] dbn-mx-auto dbn-flex dbn-flex-col dbn-gap-3 dbn-border dbn-border-gray-300 dbn-p-8 dbn-rounded-lg dbn-shadow-[0px_20px_50px_0px_#00000026]">
          <Ui.Text variant="label">Redirecting to Onboarding....</Ui.Text>
          <Ui.Text variant="label">
            Please wait while we guide you through the onboarding process.
          </Ui.Text>
        </div>
      ) : (
        <div className="dbn-w-[40rem] dbn-mx-auto dbn-flex dbn-flex-col dbn-gap-3 dbn-border dbn-border-gray-300 dbn-p-8 dbn-rounded-lg dbn-shadow-[0px_20px_50px_0px_#00000026]">
          <Ui.Text variant="label">Oops, Something went wrong!</Ui.Text>
          <Ui.Text variant="label">
            It appears there was an issue with email verification.
          </Ui.Text>
          <Link
            to="/users/sign-up"
            className="dbn-not-italic dbn-font-normal dbn-text-sm dbn-leading-[1.063rem] dbn-underline dbn-text-blue-h4"
          >
            Would you like to sign up again?
          </Link>
        </div>
      )}
    </div>
  );
};

export default Verification;
