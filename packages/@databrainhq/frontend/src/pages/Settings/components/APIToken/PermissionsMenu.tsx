import { Ui } from '@databrainhq/plugin';
import { ApiTokenType } from './ApiRow';

const PermissionsMenu = ({ row }: { row: ApiTokenType }) => {
  const permissions = row.scope.split(',');
  return (
    <Ui.Menu
      buttonVariant="text-with-icon"
      buttonText={permissions.length.toString()}
      items={permissions.map((permission) => ({
        name: permission,
        leftIcon: <Ui.Icons name="gear" />,
      }))}
      menuWidth="300px"
    />
  );
};

export default PermissionsMenu;
