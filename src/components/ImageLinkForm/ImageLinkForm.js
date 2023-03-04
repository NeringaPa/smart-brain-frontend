import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, predictions, imageUrl }) => {
  return (
    <div>
      <p className="f1">{"Detect the person age in your pictures!"}</p>
      <p className="f5">{"NOTE: for better results please use person photo in .jpg format and more cropped."}</p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={(e) => {onInputChange(e);}}
          />
          <button
            className="w-30 grow f4 link ph3 dib white bg-light-purple"
            onClick={(e) => {onButtonSubmit(e);}}
          >
            Detect
          </button>
        </div>
      </div>
      <p className="f2">{`Predicted age interval is between: ${predictions}`}</p>
      <div className="center ma">
        <div className="absolute mt2">
          <img
            //id="inputimage"
            alt="imported_photo"
            src={imageUrl}
            width="500px"
            height="auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
