import React from "react";
import "../styles.scss";
import Histogramm from "./Histogramm";

const Furnace = ({ data, name, secondName, titleColor, motionColor }: any) => {
  const sum = (type) =>
    data.map((item) => item[type]).reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div className="furnace">
      <div className="furnace-block-name">
        <div className="furnace-name">
          <span style={{ backgroundColor: titleColor }}>{name}</span>
        </div>
        <div
          className="furnace-name-icon"
          style={{ backgroundColor: motionColor }}
        />
        <div>{secondName}</div>
      </div>

      <div className="furnace-histogram">
        {data && <Histogramm data={data} />}
      </div>

      <div className="furnace-results">
        <div className="furnace-results-title">Производство чугуна</div>
        <div className="furnace-results-row">
          <div className="furnace-results-row-name">План</div>
          <div className="furnace-results-row-value">{sum("plan")}</div>
        </div>
        <div className="furnace-results-row">
          <div className="furnace-results-row-name">Прозноз +3ч</div>
          <div className="furnace-results-row-value">{sum("prog")}</div>
        </div>
        <div className="furnace-results-row">
          <div className="furnace-results-row-name">Факт</div>
          <div className="furnace-results-row-value">{sum("fact")}</div>
        </div>
      </div>
    </div>
  );
};

export default Furnace;
