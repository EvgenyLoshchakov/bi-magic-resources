import React from "react";

const List = ({ data, title, subtitles }) => {
  return (
    <div className="main">
      <div className="title">{title}</div>
      <div className="row-title">
        {subtitles?.map((item) => (
          <div>{item}</div>
        ))}
      </div>

      {data?.map((item) => {
        return (
          <div className="row">
            {item.material_name && (
              <div className="row-item">{item.material_name || "—"}</div>
            )}
            {item.o_s_0 && (
              <div className="row-item">
                {item.o_s_0 === 0 ? "—" : item.o_s_0}
              </div>
            )}

            {item.p_s_1 || item.p_s_1 === 0 ? (
              <div className="row-item">
                {item.r_s_1 === 0 ? "—" : item.r_s_1}{" "}
              </div>
            ) : null}
            {item.r_s_1 || item.r_s_1 === 0 ? (
              <div className="row-item">
                {item.r_s_1 === 0 ? "—" : item.r_s_1}{" "}
              </div>
            ) : null}
            {item.o_s_1 || item.o_s_1 === 0 ? (
              <div className="row-item">
                {item.o_s_1 === 0 ? "—" : item.o_s_1}{" "}
              </div>
            ) : null}
            {item.k_s_1 || item.k_s_1 === 0 ? (
              <div className="row-item">
                {item.k_s_1 === 0 ? "—" : item.k_s_1}{" "}
              </div>
            ) : null}

            {(item.p_s_2 || item.p_s_2 === 0) && (
              <div className="row-item">
                {item.r_s_2 === 0 ? "—" : item.r_s_2}{" "}
              </div>
            )}
            {(item.r_s_2 || item.r_s_2 === 0) && (
              <div className="row-item">
                {item.r_s_2 === 0 ? "—" : item.r_s_2}{" "}
              </div>
            )}
            {(item.o_s_2 || item.o_s_2 === 0) && (
              <div className="row-item">
                {item.o_s_2 === 0 ? "—" : item.o_s_2}{" "}
              </div>
            )}
            {(item.k_s_2 || item.k_s_2 === 0) && (
              <div className="row-item">
                {item.k_s_2 === 0 ? "—" : item.k_s_2}{" "}
              </div>
            )}

            {item.p_s_3 || item.p_s_3 === 0 ? (
              <div className="row-item">
                {item.r_s_3 === 0 ? "—" : item.r_s_3}{" "}
              </div>
            ) : null}
            {item.r_s_3 || item.r_s_3 === 0 ? (
              <div className="row-item">
                {item.r_s_3 === 0 ? "—" : item.r_s_3}{" "}
              </div>
            ) : null}
            {item.o_s_3 || item.o_s_3 === 0 ? (
              <div className="row-item">
                {item.o_s_3 === 0 ? "—" : item.o_s_3}{" "}
              </div>
            ) : null}
            {item.k_s_3 || item.k_s_3 === 0 ? (
              <div className="row-item">
                {item.k_s_3 === 0 ? "—" : item.k_s_3}{" "}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default List;
