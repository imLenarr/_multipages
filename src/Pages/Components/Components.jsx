import Counter from "../../Component/Counter/Counter";
import Timer from "../../Component/Timer/Timer";
import Add from "../../Component/Add/Add";
import Temperatures01 from "../../Component/Temperatures/Temperatures01";


// import "./App.css";
import "./Components.css";

function Components() {
//   return function App() {
    return (
      <div className="components-container" align="center">
        <div>
          <h1 className="main-title"> REACT COMPONENT </h1>
          <div className="grid-container">
            <div className="counter">
              <Counter />
              <Timer />
            </div>

            <div className="add">
              <Add />
            </div>
          </div>

          <div className="temperatures">
            <Temperatures01 />
          </div>

          <footer>
            <h2>นางสาววรรณษา วงค์ดี รหัส 66080740</h2>
          </footer>
        </div>
      </div>
    );
//   };
}

export default Components;
