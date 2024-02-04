import { ChildrenProps } from 'types';

const ExternalDataset = ({ children }: ChildrenProps) => {
  return <div className="dbn-h-full dbn-w-full">{children}</div>;
};

export default ExternalDataset;
