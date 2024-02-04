import { useEffect } from 'react';
import SigninForm from './components/Form/SigninForm';

const SignIn = () => {
  useEffect(() => {
    if (window.analytics) window.analytics.page('auth page', 'SignIn');
  }, []);

  return (
    <div className="dbn-h-full dbn-w-full dbn-flex dbn-items-center dbn-justify-center dbn-p-8">
      <SigninForm />
    </div>
  );
};

export default SignIn;
