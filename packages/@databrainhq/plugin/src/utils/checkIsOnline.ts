const checkIsOnline = async () => {
  if (!navigator.onLine) return false;

  try {
    await fetch(import.meta.env.VITE_END_POINT);
    return true;
  } catch (error) {
    if (error instanceof TypeError && error.message === 'Failed to fetch')
      return false;
    return true;
  }
};

export default checkIsOnline;
