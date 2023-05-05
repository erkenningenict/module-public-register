export const toDutchDate = (date: string) => {
  return new Date(date).toLocaleDateString("nl", { dateStyle: "short" });
};

export const getApiKey = () => {
  return import.meta.env.VITE_API_KEY;
};
