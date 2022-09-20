import React from "react";
import "../styles.scss";
import Histogramm from "./Histogramm";
import getColorMoveFurnace from "../utils/getColorMoveFurnace";

const Furnace = ({ data, dataEx6, name, className, currentTheme }: any) => {
  const sum = (type: string) =>
    data
      .map((item) => item[type])
      ?.reduce((partialSum, a) => partialSum + a, 0);

  return (
    <div className="furnace">
      <div className="furnace-block-name">
        {getColorMoveFurnace(dataEx6) &&
          dataEx6?.map((item) => {
            return (
              <>
                <div className={`${className} furnace-name`}>{item?.dp}</div>
                <div
                  className={`${
                    getColorMoveFurnace(dataEx6)[0]
                  } furnace-name-icon`}
                />
                <div>{name}</div>
              </>
            );
          })}
      </div>

      <div className="furnace-histogram">
        {data && <Histogramm data={data} currentTheme={currentTheme} />}
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
