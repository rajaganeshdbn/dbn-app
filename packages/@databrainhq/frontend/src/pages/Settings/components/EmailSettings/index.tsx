/* eslint-disable import/no-relative-parent-imports */
import SettingsLayout from 'pages/Settings';
import SmtpSettingsForm from './components/SmtpSettingsForm';

const EmailSettings = () => {
  return (
    <SettingsLayout>
      <div className="dbn-w-full dbn-h-full">
        <SmtpSettingsForm />
      </div>
    </SettingsLayout>
  );
};

export default EmailSettings;
