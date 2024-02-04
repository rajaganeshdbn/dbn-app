const graphqlErrorHandler = () => {
  const errorHandler = (
    errorsStr: string,
    showError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    showError(errorsStr);
  };
  const errorsHandler = (
    errorsStr: string,
    showError: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (
      errorsStr.includes('companies_name_key') &&
      errorsStr.includes('Uniqueness violation')
    ) {
      showError('A company using this name already exists.');
    }
    if (
      errorsStr.includes('users_email_key') &&
      errorsStr.includes('Uniqueness violation')
    ) {
      showError('An account using this email already exists.');
    }
  };

  return { errorHandler, errorsHandler };
};

export default graphqlErrorHandler;
