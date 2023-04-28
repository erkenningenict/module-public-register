import Search from "./Search";
import Results from "./Results";

function App() {
  console.log("#DH# app render", new Date().getTime());
  return (
    <div>
      <Search></Search>
      <Results></Results>
    </div>
  );
}

export default App;
