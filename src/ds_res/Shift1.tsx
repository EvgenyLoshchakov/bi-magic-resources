import React from "react";
import "./DatePicker.scss";
import { MyService } from "../services/MyService";
import { ThemeVC } from "bi-internal/services";
import List from "./List";

const renderColumns = ["P_S_1", "R_S_1", "O_S_1", "K_S_1", "acc_date"];

export default class Shift1 extends React.Component<any> {
  private _myService: MyService;
  public _chart: any = null;

  public state: {
    data: any;
    theme: any;
  };

  public constructor(props) {
    super(props);
    this.state = {
      data: [],
      theme: {},
    };
  }

  public componentDidMount(): void {
    ThemeVC.getInstance().subscribeUpdatesAndNotify(this._onThemeVCUpdated);
    const { cfg } = this.props;
    const koob =
      cfg.getRaw().koob || "luxmsbi.custom_melt_steel_oper_newation_4";
    this._myService = MyService.createInstance(koob);
    this._myService.subscribeUpdatesAndNotify(this._onSvcUpdated);
  }

  private _onThemeVCUpdated = (themeVM): void => {
    if (themeVM.error || themeVM.loading) return;
    this.setState({ theme: themeVM.currentTheme });
  };

  private _onSvcUpdated = (model) => {
    const { cfg } = this.props;
    const koob =
      cfg.getRaw().koob || "luxmsbi.custom_melt_steel_oper_newation_4";
    // console.log(model, "model Shift1");

    const filters =
      model.currentDate !== "" ? { acc_date: ["=", model.currentDate] } : {};

    if (model.loading || model.error) return;

    // console.log(filters, "filters Shift1");
    this._myService
      .getKoobDataByCfg({
        with: koob,
        columns: renderColumns,
        filters,
      })
      .then((data) => {
        this.setState({ data });
      });

    // console.log("Shift1 updated!");
  };

  public componentWillUnmount() {
    ThemeVC.getInstance().unsubscribe(this._onThemeVCUpdated);
  }

  public render() {
    const { data } = this.state;
    const shiftsTitles = ["Приход, т", "Расход, т", "Остаток, т", "Корр."];

    console.log(data, "DATA Shift1");

    return <List data={data} title={"Смена 1"} subtitles={shiftsTitles} />;
  }
}
