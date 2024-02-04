import { Ui } from '@databrainhq/plugin';

type Props = {
  title: String;
  description: String;
};

const Header = ({ title, description }: Props) => {
  return (
    <div className="dbn-flex dbn-flex-col dbn-gap-2 dbn-mb-4">
      <Ui.Text variant="heading-lg">{title}</Ui.Text>
      <Ui.Text variant="body-text-sm">{description}</Ui.Text>
    </div>
  );
};

export default Header;
