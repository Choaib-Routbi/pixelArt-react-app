import { useState, useRef } from "react";
import { toJpeg } from "html-to-image";
import download from "downloadjs";
import "./App.css";

function App() {
  const [size, setSize] = useState("");
  const [bgChosenValue, setBgChosenValue] = useState("");
  const [pixelColor, setPixelColor] = useState("");
  const [pixelColors, setPixelColors] = useState([]);
  const imgRef = useRef(null);

  const handelsize = (e) => {
    setSize(e.target.value);
  };

  const gridRender = () => {
    if (!size) return;
    const gridSize = Number(size);
    setPixelColors(Array(gridSize).fill(bgChosenValue));
  };

  const handlePixelClick = (idx) => {
    const newColors = [...pixelColors];
    newColors[idx] = pixelColor;
    setPixelColors(newColors);
  };

  // Determine grid class
  let gridClass = "small-grid";
  const gridSize = Number(size);
  if (gridSize === 256) gridClass = "medium-grid";
  else if (gridSize === 1024) gridClass = "large-grid";
  else if (gridSize === 4096) gridClass = "huge-grid";

  const exportImg = async () => {
    const exportContainer = document.getElementById("grid-container");
    if (!imgRef.current) return;

    try {
      // Step 2: Convert the HTML to image data
      exportContainer.style.margin = 0;
      const dataUrl = await toJpeg(imgRef.current);
      // Step 3: Trigger the download
      download(dataUrl, "pixel-art.jpeg");
      exportContainer.style.margin = "0 auto";
      exportContainer.style.marginBottom = "100px";
    } catch (err) {
      console.error("Export failed:", err);
    }
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
            />
            <label htmlFor="inpColorChoose">color : </label>
            <input
              id="inpColorChoose"
              className="color-input"
              type="color"
              value={pixelColor}
              onChange={(e) => setPixelColor(e.target.value)}
            />
            <button className="toolbar-button" onClick={gridRender}>
              generate
            </button>
            <button className="toolbar-button" onClick={exportImg}>
              export as jpeg
            </button>
          </div>
        </div>
        {pixelColors.length > 0 && (
          <div
            id="grid-container"
            ref={imgRef}
            className={`grid-container ${gridClass}`}
          >
            {pixelColors.map((color, i) => (
              <div
                key={i}
                className="one-pixel"
                style={{ backgroundColor: color }}
                onClick={() => handlePixelClick(i)}
              ></div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
