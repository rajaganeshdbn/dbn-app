import { Ui } from '@databrainhq/plugin';

interface Props {
  title: any;
  count: number;
  icon: any;
}

const IssueHeading = ({ title, icon, count }: Props) => {
  return (
    <div className="dbn-flex dbn-items-center dbn-justify-between dbn-py-2 dbn-px-4 lg:dbn-px-9 dbn-bg-gray-100">
      <div className="dbn-flex dbn-items-center dbn-gap-4">
        {icon}
        <Ui.Text variant="body-text-sm">{title}</Ui.Text>
        <div className="dbn-flex dbn-gap-2 dbn-text-sm dbn-text-gray-500">
          <Ui.Icons name="not-found" />
          {/* plus fill */}
          <Ui.Text variant="body-text-sm">{count}</Ui.Text>
        </div>
      </div>
      <Ui.Button type="button" variant="tertiary">
        <Ui.Icons name="not-found" />
        {/* add line icon */}
      </Ui.Button>
    </div>
  );
};

export default IssueHeading;
