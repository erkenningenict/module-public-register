import Search from "./Search";
import Results from "./Results";

function App() {
  const queryParameters = new URLSearchParams(window.location.search);
  const labelQs = queryParameters.get("label");
  let label = "groenkeur";
  if (labelQs !== null && labelQs !== "") {
    label = labelQs;
  } else {
    const links = document.getElementsByTagName("link");
    const preconnectExists = () => {
      for (var i = 0; i < links.length; i++) {
        if (links[i].rel === "preconnect") return true;
      }
    };
    if (!preconnectExists()) {
      const linkGoogleApis = document.createElement("link");
      linkGoogleApis.rel = "preconnect";
      linkGoogleApis.href = "https://fonts.googleapis.com";

      document.head.appendChild(linkGoogleApis);

      const linkGoogleStatic = document.createElement("link");
      linkGoogleStatic.rel = "preconnect";
      linkGoogleStatic.href = "https://fonts.gstatic.com";
      linkGoogleStatic.crossOrigin;

      document.head.appendChild(linkGoogleStatic);

      const fontLoader = function (fontName: string) {
        const link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = `http://fonts.googleapis.com/css?family=${fontName}`;

        document.head.appendChild(link);
      };

      fontLoader("Dosis");
    }
  }
  const supportedLabels: Record<string, string> = {
    groenkeur: "",
    aockeurmerk: "theme-aockeurmerk",
    nkc: "theme-nkc",
  };

  return (
    <div className={`flex flex-col font-sans gap-2 ${supportedLabels[label]}`}>
      <Search></Search>
      <Results></Results>
    </div>
  );
}

export default App;
