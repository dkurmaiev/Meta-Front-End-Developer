import "./App.css";
import Card from "./Card";

function App() {
  return (
    <div>
      <h1>Task: Add three Card elements</h1>
      <Card h2="First card h2" h3="first card h3" />
      <Card h2="Second card h2" h3="Second card h3" />
      <Card h2 = "Third card h2" h3 = "Third card h3"/>
    </div>
  );
}

export default App;
