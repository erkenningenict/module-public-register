import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useStore } from "./state";
import { getApiKey } from "./utils";
import Icon from "./components/Icon";
import Alert from "./components/Alert";

export const Search = () => {
  const store = useStore();
  const [search, setSearch] = useState<string>("");
  const [cert, setCert] = useState<string>(store.selectedCertificate);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const { isLoading, error, data } = useQuery<{ certCode: string }[]>({
    queryKey: ["certificates"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/certificates`, {
        headers: {
          apikey: getApiKey(),
        },
      }).then((res) => res.json()),
  });

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!search || search.length == 1) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
      store.searchValue = search;
      store.selectedCertificate = cert;
    }
  };

  const handleCertificateChange = (e: any) => {
    setCert(e.target.value);
  };

  if (isLoading)
    return (
      <div className="p-2 flex flex-col gap-4">
        <Icon
          imageName="spinner"
          className="animate-spin fill-skin-fill"
          size={56}
        />
        <p>Gegevens worden geladen...</p>
      </div>
    );

  if (error)
    return (
      <Alert type={"error"}>
        Er is een fout opgetreden. Probeer het later opnieuw.
      </Alert>
    );

  return (
    <form onSubmit={handleSearch}>
      <div className="inline-flex flex-col gap-1">
        <div>
          <label htmlFor="search" className="block font-light text-skin-base">
            Zoeken:
            <input
              id="search"
              type="search"
              className="form-input block mt-1 w-full rounded-md"
              placeholder="Vind op achternaam"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              maxLength={50}
            ></input>
          </label>
          {invalidInput && (
            <div className="text-red-500">Voer ten minste 2 karakters in</div>
          )}
        </div>
        {data && data?.length > 0 && (
          <fieldset
            className="mt-2"
            onChange={(e) => handleCertificateChange(e)}
          >
            <legend className="inline-flex items-center font-light text-skin-base">
              Persoonscertificaten
            </legend>
            <div className="mt-1">
              {data?.map((c) => (
                <div key={c.certCode}>
                  <label className="inline-flex items-center">
                    <input
                      className="form-radio"
                      type="radio"
                      name="radio-direct"
                      defaultChecked={cert === c.certCode}
                      value={c.certCode}
                    />
                    <span className="ml-2">{c.certCode}</span>
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        )}
        <button
          className="px-2 py-3 disabled:text-gray-400 bg-skin-button-accent hover:bg-skin-button-accent-hover text-white transition-colors font-bold rounded-xl"
          onClick={handleSearch}
        >
          Zoeken
        </button>
      </div>
    </form>
  );
};

export default Search;
