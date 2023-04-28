import { useQuery } from "@tanstack/react-query";
import { useStore } from "./state";
import { getApiKey, toDutchDate } from "./utils";
import Icon from "./Icon";

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
        `https://groenkeurapi.acceptatie.erkenningen.nl/api/students?search=${store.searchValue}&certificates=${store.selectedCertificate}`,
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
        className="animate-spin fill-blue-800"
        size={56}
      />
    );

  if (error) return <div>"An error has occurred: " + error</div>;

  return (
    <div className="flex flex-col gap-3 mt-3">
      {data?.length === 0 ? (
        <div>Er zijn geen resultaten beschikbaar.</div>
      ) : (
        data?.map((s) => (
          <div key={s.id}>
            <div className="text-green-500 text-2xl">
              {s.initialen} {s.voornaam} {s.achternaam}
            </div>
            <div className="">
              {s.certificaten[0].certCode} (Uitgegeven op{" "}
              {toDutchDate(s.certificaten[0].beginDatum)} en geldig tot{" "}
              {toDutchDate(s.certificaten[0].eindDatum)})
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Results;
