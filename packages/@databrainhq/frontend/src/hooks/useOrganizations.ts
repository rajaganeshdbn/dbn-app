import {
  useAddOrganizationMutation,
  useDeleteDefaultClientMutation,
  useUpdateOrganizationMutation,
} from 'utils/generated/graphql';

const useOrganizations = () => {
  const {
    mutateAsync: addOrganization,
    isLoading: isAddingOrganization,
    error: organizationAddError,
  } = useAddOrganizationMutation();
  const {
    mutateAsync: updateOrganization,
    isLoading: isUpdatingOrganization,
    error: organizationUpdateError,
  } = useUpdateOrganizationMutation();
  const {
    mutateAsync: deleteDefaultClient,
    isLoading: isDeletingDefaultClient,
    error: deleteDefaultClientError,
  } = useDeleteDefaultClientMutation();
  return {
    addOrganization,
    updateOrganization,
    deleteDefaultClient,
    isMutatingOrganization:
      isAddingOrganization || isUpdatingOrganization || isDeletingDefaultClient,
    errorMutatingOrganization:
      organizationAddError ||
      organizationUpdateError ||
      deleteDefaultClientError,
  };
};

export default useOrganizations;
