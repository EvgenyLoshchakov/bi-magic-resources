import React from "react";
import "../styles.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="header-title"> 3.7 Показатели работы конвертеров</div>
      <div className="row">
        <div className="header-total">Итого по цеху</div>
      </div>
      <div className="row">
        <div className="item item-order">№</div>
        <div className="item item-name">Наименование показателя</div>
        <div className="item item-unit">ед. изм</div>

        <div className="header-block">
          <div className="item">Конвертер 1</div>
          <div className="header-item-measure">
            <div className="item">за месяц</div>
            <div className="item">с начала года</div>
          </div>
        </div>

        <div className="header-block">
          <div className="item">Конвертер 2</div>
          <div className="header-item-measure">
            <div className="item">за месяц</div>
            <div className="item">с начала года</div>
          </div>
        </div>

        <div className="header-block">
          <div className="item">Конвертер 3</div>
          <div className="header-item-measure">
            <div className="item">за месяц</div>
            <div className="item">с начала года</div>
          </div>
        </div>

        <div className="header-block">
          <div className="item">за месяц</div>
          <div className="header-item-measure">
            <div className="item">план</div>
            <div className="item">год</div>
          </div>
        </div>

        <div className="header-block ">
          <div className="item">за год</div>
          <div className="header-item-measure">
            <div className="item">план</div>
            <div className="item">год</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
