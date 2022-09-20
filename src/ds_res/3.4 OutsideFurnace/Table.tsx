import React from "react";
import "./styles.scss";
import { OutsideFurnaceService } from "../../services/OutsideFurnace";
import { ThemeVC } from "bi-internal/services";
import { mainKoob } from "../../constants";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const renderColumns = [
  "acc_date",
  "material_name",
  "O_S_0",
  "P_S_1",
  "R_S_1",
  "O_S_1",
  "K_S_1",
  "P_S_2",
  "R_S_2",
  "O_S_2",
  "K_S_2",
  "P_S_3",
  "R_S_3",
  "O_S_3",
  "K_S_3",
];

export default class Table extends React.Component<any> {
  private _OutsideFurnaceService: OutsideFurnaceService;
  public _chart: any = null;

  public state: {
    data: any;
    theme: any;
    loading: boolean;
  };

  public constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      theme: {},
    };
  }

  public componentDidMount(): void {
    ThemeVC.getInstance().subscribeUpdatesAndNotify(this._onThemeVCUpdated);
    const koob = mainKoob;
    this._OutsideFurnaceService = OutsideFurnaceService.createInstance(koob);
    this._OutsideFurnaceService.subscribeUpdatesAndNotify(this._onSvcUpdated);
  }

  private _onThemeVCUpdated = (themeVM): void => {
    if (themeVM.error || themeVM.loading) return;
    this.setState({ theme: themeVM.currentTheme });
  };

  private _onSvcUpdated = (model) => {
    const koob = mainKoob;

    const filters =
      model.currentDate !== "" ? { acc_date: ["=", model.currentDate] } : {};

    if (model.loading || model.error) return;

    this._OutsideFurnaceService
      .getKoobDataByCfg({
        with: koob,
        columns: renderColumns,
        filters,
      })
      .then((data) => {
        this.setState({ data, loading: false });
      });
  };

  public componentWillUnmount() {
    ThemeVC.getInstance().unsubscribe(this._onThemeVCUpdated);
  }

  public render() {
    const { data, loading, theme } = this.state;

    const shiftsTitles = ["Приход, т", "Расход, т", "Остаток, т", "Корр."];

    const isData = data.length > 0 && !loading;

    const noDateText = "Нет данных за выбранную дату!";

    if (loading) {
      return (
        <Box className="loader">
          <CircularProgress size={100} />
        </Box>
      );
    }

    return isData ? (
      <div className="main">
        <div className="column">
          <div className="fixed">
            <div className="title">Остатки материала</div>

            <div className="row-title">
              <div>Материал</div>
              <div>Остаток, т</div>
            </div>
          </div>
          {data.map((item) => {
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
              </div>
            );
          })}
        </div>

        <div className="column">
          <div className="fixed fixed-shift">
            <div className="title title-shift">Смена 1</div>

            <div className="row-title row-title-shift">
              {shiftsTitles?.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </div>

          {data?.map((item) => {
            return (
              <div className="row row-shift">
                <div className="row-item">
                  {item.p_s_1 && item.p_s_1 !== 0 ? item.p_s_1 : "—"}
                </div>
                <div className="row-item">
                  {item.r_s_1 && item.r_s_1 !== 0 ? item.r_s_1 : "—"}
                </div>
                <div className="row-item">
                  {item.o_s_1 && item.o_s_1 !== 0 ? item.o_s_1 : "—"}
                </div>
                <div className="row-item">
                  {item.k_s_1 && item.k_s_1 !== 0 ? item.k_s_1 : "—"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="column">
          <div className="fixed fixed-shift">
            <div className="title title-shift">Смена 2</div>

            <div className="row-title row-title-shift">
              {shiftsTitles?.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </div>

          {data.map((item) => {
            return (
              <div className="row row-shift">
                <div className="row-item">
                  {item.p_s_2 && item.p_s_2 !== 0 ? item.p_s_2 : "—"}
                </div>
                <div className="row-item">
                  {item.r_s_2 && item.r_s_2 !== 0 ? item.r_s_2 : "—"}
                </div>
                <div className="row-item">
                  {item.o_s_2 && item.o_s_2 !== 0 ? item.o_s_2 : "—"}
                </div>
                <div className="row-item">
                  {item.k_s_2 && item.k_s_2 !== 0 ? item.k_s_2 : "—"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="column">
          <div className="fixed fixed-shift">
            <div className="title title-shift">Смена 3</div>

            <div className="row-title row-title-shift">
              {shiftsTitles?.map((item) => (
                <div>{item}</div>
              ))}
            </div>
          </div>

          {data.map((item) => {
            return (
              <div className="row row-shift">
                <div className="row-item">
                  {item.p_s_3 && item.p_s_3 !== 0 ? item.p_s_3 : "—"}
                </div>
                <div className="row-item">
                  {item.r_s_3 && item.r_s_3 !== 0 ? item.r_s_3 : "—"}
                </div>
                <div className="row-item">
                  {item.o_s_3 && item.o_s_3 !== 0 ? item.o_s_3 : "—"}
                </div>
                <div className="row-item">
                  {item.k_s_3 && item.k_s_3 !== 0 ? item.k_s_3 : "—"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="noData">{noDateText}</div>
    );
  }
}
