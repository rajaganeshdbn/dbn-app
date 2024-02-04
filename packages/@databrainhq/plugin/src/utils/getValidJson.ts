export const getValidJson = (json: string) => {
  if (typeof json === 'string') {
    try {
      return JSON.parse(json);
    } catch (_err) {
      return {};
    }
  } else if (typeof json === 'object') {
    return json;
  } else {
    return {};
  }
};
