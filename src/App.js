import "./App.css";
import BoardContainer from "./components/BoardContainer/BoardContainer";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="App_outer">
        <BoardContainer />
      </div>
    </div>
  );
}

export default App;
