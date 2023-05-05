import { useQuery } from "@tanstack/react-query";
import { useStore } from "./state";
import { getApiKey, toDutchDate } from "./utils";
import Icon from "./components/Icon";
import Alert from "./components/Alert";

interface StudentInfo {
  achternaam: string;
  id: string;
  initialen: string;
  voornaam: string;
  certificaten: Certificate[];
}

interface Certificate {
  beginDatum: string;
  certCode: string;
  eindDatum: string;
}

const Results = () => {
  const store = useStore();

  const { isLoading, error, data } = useQuery<StudentInfo[]>({
    queryKey: [
      "students",
      {
        searchValue: store.searchValue,
        certificate: store.selectedCertificate,
      },
    ],
    enabled: store.searchValue !== "" && store.selectedCertificate !== "",
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_API_URL}/students?search=${
          store.searchValue
        }&certificates=${store.selectedCertificate}`,
        {
          headers: {
            apikey: getApiKey(),
          },
        }
      ).then((res) => res.json()),
  });

  if (store.searchValue === "") {
    return null;
  }

  if (isLoading)
    return (
      <Icon
        imageName="spinner"
        className="animate-spin fill-skin-fill"
        size={56}
      />
    );

  if (error)
    return (
      <Alert type="error">
        Er is een fout opgetreden. Probeer het later opnieuw.
      </Alert>
    );

  return (
    <div className="flex flex-col gap-3 mt-3">
      {data?.length === 0 ? (
        <Alert type="warning">
          Er zijn geen resultaten beschikbaar. Pas de zoekcriteria aan.
        </Alert>
      ) : (
        data?.map((s) => (
          <div key={s.id} className="border-t border-gray-500 pt-3">
            <div className="text-skin-primary text-xl">
              {s.initialen} {s.voornaam} {s.achternaam}
            </div>
            <div className="flex gap-2">
              <Icon imageName="check-mark" className="mt-1 shrink-0"></Icon>
              <div className="flex xs:gap-0 flex-col">
                <span>{s.certificaten[0].certCode}</span>
                <span className="tabular-nums">
                  Uitgegeven op {toDutchDate(s.certificaten[0].beginDatum)} en
                  geldig tot {toDutchDate(s.certificaten[0].eindDatum)}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Results;
