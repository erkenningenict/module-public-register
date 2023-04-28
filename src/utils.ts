export const toDutchDate = (date: string) => {
  return new Date(date).toLocaleDateString("nl");
};

export const getApiKey = () => {
  return import.meta.env.VITE_API_KEY;
};
