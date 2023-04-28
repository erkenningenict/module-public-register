import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useStore } from "./state";
import { getApiKey } from "./utils";
import Icon from "./Icon";

export const Search = () => {
  const store = useStore();
  const [search, setSearch] = useState<string>("");
  const [cert, setCert] = useState<string>(store.selectedCertificate);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const { isLoading, error, data } = useQuery<{ certCode: string }[]>({
    queryKey: ["certificates"],
    queryFn: () =>
      fetch("http://localhost:8000/api/certificates", {
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
      <Icon
        imageName="spinner"
        className="animate-spin fill-blue-800"
        size={56}
      />
    );

  if (error) return <div>"An error has occurred: " + error</div>;

  return (
    <form onSubmit={handleSearch}>
      <div className="inline-flex flex-col gap-3">
        <label htmlFor="search" className="block">
          Zoeken:
          <input
            id="search"
            type="search"
            className="form-input block mt-1 w-full"
            placeholder="Vind op achternaam"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            maxLength={50}
          ></input>
        </label>
        {invalidInput && (
          <div className="text-red-500">Voer ten minste 2 karakters in</div>
        )}
        <fieldset className="mt-2" onChange={(e) => handleCertificateChange(e)}>
          <legend className="inline-flex items-center">
            Persoonscertificaten
          </legend>
          <div className="mt-2">
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
        <button
          className="px-2 py-3 bg-slate-100 disabled:text-gray-400 text-blue-500 font-bold rounded-xl"
          onClick={handleSearch}
        >
          Zoeken
        </button>
      </div>
    </form>
  );
};

export default Search;
