import IssueHeading from 'pages/Home/components/IssueHeading/IssueHeading';
import { Ui } from '@databrainhq/plugin';
import TopFilter from 'components/TopFilter/TopFilter';
// icons

const tickets = [
  {
    title: 'In Review',
    icon: <Ui.Icons name="eye" />,
    count: 3,
  },
  {
    title: 'In Progress',
    icon: <Ui.Icons name="not-found" />, // progress line icon / contrast line icon
    count: 4,
  },
  {
    title: 'Todo',
    icon: <Ui.Icons name="not-found" />, // checkbox line icon
    count: 11,
  },
];

const Header = () => {
  return (
    <div className="dbn-flex dbn-w-full dbn-h-screen dbn-overflow-y-hidden">
      <div className="dbn-flex dbn-flex-col dbn-flex-grow">
        <TopFilter title="Active issues" />

        {tickets.map((ticket) => (
          <IssueHeading
            key={`${ticket.title}-${tickets.length}`}
            title={ticket.title}
            icon={ticket.icon}
            count={ticket.count}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
