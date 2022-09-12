import React from "react";
import "./MyCustomComponent.scss";
import { MyService } from "../services/MyService";
import { ThemeVC } from "bi-internal/services";
import List from "./List";

const renderColumns = ["material_name", "O_S_0"];

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
    const koob = cfg.getRaw().koob;
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

    // const filters = cfg.getRaw().dataSource?.filters || {};

    if (model.loading || model.error) return;

    this._myService
      .getKoobDataByCfg({
        with: koob,
        columns: renderColumns,
      })
      .then((data) => {
        this.setState({ data });
      });
  };

  public componentWillUnmount() {
    ThemeVC.getInstance().unsubscribe(this._onThemeVCUpdated);
  }

  public render() {
    const { data } = this.state;
    const remainsMaterialsTitles = ["Материал", "Остаток, т"];

    return (
      <List
        data={data}
        title={"Отстатки материалов"}
        subtitles={remainsMaterialsTitles}
      />
    );
  }
}
