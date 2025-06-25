import React from "react";
import "./Toolbar.css";

const Toolbar = ({ selectedColor, setSelectedColor }) => {
    const colors = [ "black", "red", "green", "blue", "yellow", "purple", "orange", "pink" ];
    return (
        <div className="toolbar">
            {colors.map((color) => (
                <button 
                    key={color} 
                    className="color-button" 
                    style={{ backgroundColor: color, border: selectedColor === color ? "2px solid black" : "none" }}
                    onClick={() => setSelectedColor(color)}
                >
                    {selectedColor === color && <span className="checkmark">✔</span>}
                </button>
            ))}
        </div>
    )
}

export default Toolbar;