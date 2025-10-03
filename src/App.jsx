import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [size, setSize] = useState("");
  const [pixels, setPixels] = useState([]);
  const [bgChosenValue, setBgChosenValue] = useState("");
  const [pixelColor, setPixelColor] = useState("#2087db");
  const handelsize = (e) => {
    const value = e.target.value;
    setSize(value);
    console.log(value);
  };
  const gridRender = () => {
    if (!size) return;
    console.log("gnrt clicked");
    const gridSize = Number(size);
    let gridClass = "small-grid";
    if (gridSize === 256) gridClass = "medium-grid";
    else if (gridSize === 1024) gridClass = "large-grid";
    else if (gridSize === 4096) gridClass = "huge-grid";

    const storePixel = [];
    for (let i = 0; i < gridSize; i++) {
      storePixel.push(<div key={i} className="one-pixel"></div>);
    }
    setPixels(
      <div
        className={`grid-container  ${gridClass}`}
        style={{ backgroundColor: `${bgChosenValue}` }}
      >
        {storePixel}
      </div>
    );
  };

  return (
    <>
      <div className="app-container">
        <div className="toolbar">
          <h1 className="title">Pixel Art App</h1>
          <div className="color-input-container">
            <label htmlFor="options">Art Size : </label>
            <select id="options" value={size} onChange={handelsize}>
              <option value="">Select a size</option>
              <option value={8 * 8}>8x8</option>
              <option value={16 * 16}>16x16</option>
              <option value={32 * 32}>32x32</option>
              <option value={64 * 64}>64x64</option>
            </select>
            <label htmlFor="inpColorBlank">background : </label>
            <input
              id="inpColorBlank"
              className="color-input"
              type="color"
              value={bgChosenValue}
              onChange={(e) => setBgChosenValue(e.target.value)}
            ></input>
            <label htmlFor="inpColorChoose">color : </label>
            <input
              id="inpColorChoose"
              className="color-input"
              type="color"
            ></input>
            <button className="generate" onClick={gridRender}>
              generate
            </button>
          </div>
        </div>
        {pixels}
      </div>
    </>
  );
}

export default App;
