import React from "react";
import "../styles.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="title-block">Доменное производство</div>

      <div className="legend">
        <div className="title-block">Ход печи:</div>
        <div className="stopped">Остановлена</div>
        <div className="quiet">Тихий ход</div>
        <div className="norm">Норм. давление</div>
        <div className="low">Сниж. форс.</div>
        <div className="full">Полный ход</div>
      </div>
    </div>
  );
};

export default Header;
