import { Ui } from '@databrainhq/plugin';
import style from './apiToken.module.css';
import ApiRow, { ApiTokenType } from './ApiRow';

type ApiTableProps = {
  tokenList: ApiTokenType[];
};

const ApiTable: React.FC<ApiTableProps> = ({ tokenList }) => {
  const header = [
    'Token Name',
    'Permissions',
    'Created Date',
    'Status',
    'API Key',
  ];
  return (
    <div className={style.tableDiv}>
      <div className="dbn-border-b dbn-flex dbn-justify-start dbn-items-center dbn-p-3">
        <Ui.Text variant="heading-lg">API token</Ui.Text>
      </div>
      <table className={style.table}>
        <thead>
          <tr className={style.tableHead}>
            {header.map((item) => {
              return (
                <th className="dbn-px-4 dbn-text-left" scope="col">
                  <Ui.Text variant="heading-lg">{item}</Ui.Text>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tokenList.map((item) => (
            <ApiRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiTable;
