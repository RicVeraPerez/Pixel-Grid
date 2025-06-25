import React from "react";
import "./App.css";
import PixelGrid from "./PixelGrid";
import Toolbar from "./Toolbar";
import { useEffect, useState } from "react";



const App = () => {
  
    const [selectedColor, setSelectedColor] = useState("black"); 
    const [grid, setGrid] = useState([]);

  const updateColor = async (x, y) => {
    try {
      const response = await fetch("http://localhost:5000/setGridColor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x, y, color: selectedColor }),
      });
      const { grid, updateGrid } = await response.json();
      setGrid(updatedGrid);
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };



useEffect(() => {
    const fetchGrid = async () => {
        try {
        const response = await fetch("http://localhost:5000/grid");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setGrid(data.grid);
        } catch (error) {
        console.error("Error fetching grid:", error);
        }
    };
    
    fetchGrid();
    }, []);

  return <div class="content-wrapper">
    <h1>Online Pixel Grid</h1>
    <PixelGrid grid={[grid]} />
    <p>Click on a cell to change its color.</p>
    <p>Use the color picker to select a color.</p>
    <p>Enjoy creating your pixel art!</p>
    <Toolbar selectedColor={selectedColor} 
    setSelectedColor={setSelectedColor}
    />
  </div>;
};

export default App; 