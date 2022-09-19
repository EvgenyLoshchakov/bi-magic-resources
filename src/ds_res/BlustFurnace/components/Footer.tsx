import React from "react";
import "../styles.scss";

const Footer = ({ dataEx3, dataEx4, dataEx5 }) => {
  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  const furnaceList = dataEx3
    .map((item) => item?.dp_all)
    .filter(onlyUnique)
    .sort();

  const renderFurnaceList = furnaceList?.map((item) => (
    <div className="footer-title-name">{item}</div>
  ));

  const renderTable = (data) => {
    const analyticsList = data
      .map((item) => item?.analitika)
      .filter(onlyUnique);

    const splitData = analyticsList?.map((analytics) => {
      return data
        .map((item) => {
          if (item?.analitika === analytics) {
            return item;
          }
        })
        .filter(Boolean);
    });

    return splitData.map((item) => {
      const sortedItems = item.sort(function (a, b) {
        return a["dp_all"] > b["dp_all"]
          ? 1
          : b["dp_all"] > a["dp_all"]
          ? -1
          : 0;
      });

      return (
        <div className="footer-data">
          <div className="footer-title-name">{item[0]?.analitika}</div>
          {sortedItems.map((item2) => {
            return <div className="footer-title-name">{item2?.value}</div>;
          })}
        </div>
      );
    });
  };

  const DC1 = dataEx5.filter((item) => item?.put.includes("ДЦ1"));
  const DC2 = dataEx5.filter((item) => item?.put.includes("ДЦ2"));

  const renderDC = (data) => {
    return (
      <>
        <div className="footer-title">
          <div className="footer-title-name">{data[0]?.put}</div>
        </div>
        <div className="footer-data">
          {data?.map((item) => {
            return <div className="footer-title-name">{item?.analitika}</div>;
          })}
        </div>
        <div className="footer-data">
          {data?.map((item) => (
            <div className="footer-title-name">{item?.value}</div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="footer">
      <div className="footer-block">
        <div className="footer-title">
          <div className="footer-title-name">Показатель</div>
          {renderFurnaceList}
        </div>
        <div className="footer-data2">{renderTable(dataEx3)}</div>
      </div>

      <div className="footer-block">
        <div className="footer-title">
          <div className="footer-title-name">Аналитика</div>
          {renderFurnaceList}
        </div>
        <div className="footer-data2">{renderTable(dataEx4)}</div>
      </div>

      <div className="footer-small-block">{renderDC(DC1)}</div>
      <div className="footer-small-block">{renderDC(DC2)}</div>
    </div>
  );
};

export default Footer;
