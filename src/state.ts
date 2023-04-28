import { proxy } from "valtio";
import { useProxy } from "valtio/utils";

interface IStore {
  searchValue: string;
  selectedCertificate: string;
}

const state = proxy<IStore>({
  searchValue: "",
  selectedCertificate: "Veilig werken op hoogte",
});

export const useStore = () => {
  return useProxy(state);
};
