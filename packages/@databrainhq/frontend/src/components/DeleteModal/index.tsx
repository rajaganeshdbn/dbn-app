import { Ui } from '@databrainhq/plugin';
import Flex from 'components/Flex';

type Props = {
  isShowDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: () => void;
  title?: string;
  alertMessage: string;
  actionTitle?: string;
  isLoading?: boolean;
};

const DeleteModal = ({
  isShowDeleteModal,
  setShowDeleteModal,
  onDelete,
  title,
  alertMessage,
  actionTitle,
  isLoading,
}: Props) => {
  return (
    <Ui.Modal
      isOpen={isShowDeleteModal}
      onClose={() => setShowDeleteModal(false)}
      headerTitle={title}
    >
      <Flex
        justify="center"
        alignItems="center"
        direction="col"
        className="dbn-gap-2 dbn-my-auto dbn-p-8"
      >
        <span className="dbn-text-red-500 dbn-text-4xl">
          <Ui.Icons name="delete" color="alert" />
        </span>
        <Ui.Text variant="body-text-sm">{alertMessage}</Ui.Text>
      </Flex>
      <Ui.ModalFooter className="dbn-justify-between">
        <div className="dbn-ml-auto dbn-flex dbn-gap-4">
          <Ui.Button
            type="reset"
            variant="primary"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Ui.Button>
          <Ui.Button
            type="submit"
            variant="secondary"
            isDisabled={isLoading}
            onClick={() => onDelete()}
          >
            {isLoading ? 'Loading...' : actionTitle || 'Delete'}
          </Ui.Button>
        </div>
      </Ui.ModalFooter>
    </Ui.Modal>
  );
};

export default DeleteModal;
