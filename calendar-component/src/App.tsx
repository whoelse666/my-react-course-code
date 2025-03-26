import dayjs from "dayjs";
import Calendar from "./Calendar";
import { useState } from "react";

function App() {
  const [value, setValue] = useState(dayjs("2023-11-08"));

  return (
    <div className="App">
      <Calendar
        className={"aaa"}
        value={value}
        onChange={val => {
          console.log("onChange :>> ", val);
          setValue(val);
        }}
        dateInnerContent={value => {
          return (
            <div>
              <p style={{ background: "yellowgreen", height: "30px" }}>{value.format("YYYY/MM/DD")}</p>
            </div>
          );
        }}
    
      ></Calendar>
    </div>
  );
}

export default App;
