import { Ui } from '@databrainhq/plugin';
import { Link } from 'react-router-dom';

const InviteRequest = () => {
  return (
    <div className="dbn-w-full dbn-h-full dbn-flex dbn-justify-between dbn-items-center">
      <div className="sm:dbn-w-[40rem] dbn-mx-auto dbn-flex dbn-flex-col dbn-gap-3 dbn-border dbn-border-gray-300 dbn-p-8 dbn-rounded-lg dbn-shadow-[0px_20px_50px_0px_#00000026]">
        <Ui.Text variant="label">Your Company Already Exists</Ui.Text>
        <Ui.Text variant="label">
          We are unable to create a new company account as it already exists in
          Databrain. Kindly contact your administrator to request an invitation.
        </Ui.Text>
        <Link
          to="/users/sign-up"
          className="dbn-not-italic dbn-font-normal dbn-text-sm dbn-leading-[1.063rem] dbn-underline dbn-text-blue-h4"
        >
          create a new company?
        </Link>
      </div>
    </div>
  );
};

export default InviteRequest;
