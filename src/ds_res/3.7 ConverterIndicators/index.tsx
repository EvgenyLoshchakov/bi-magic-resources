import React from "react";
import "./styles.scss";
import { ConverterIndicatorsService } from "../../services/ConverterIndicators";
import { ThemeVC } from "bi-internal/services";
import Header from "./Header";

export default class ConverterIndicators extends React.Component<any> {
  private _ConverterIndicatorsService: ConverterIndicatorsService;
  public _chart: any = null;

  public state: {
    data: any;
    currentTheme: string;
  };

  public constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentTheme: "",
    };
  }

  public componentDidMount(): void {
    ThemeVC.getInstance().subscribeUpdatesAndNotify(this._onThemeVCUpdated);
    const { cfg } = this.props;
    const koob = cfg.getRaw().koob || "luxmsbi.custom_report_3_7_new";

    this._ConverterIndicatorsService =
      ConverterIndicatorsService.createInstance(koob);

    this._ConverterIndicatorsService.subscribeUpdatesAndNotify(
      this._onSvcUpdated
    );

    this.setState({
      currentTheme: ThemeVC.getInstance()._model.currentThemeId,
    });
  }

  private _onThemeVCUpdated = (themeVM): void => {
    if (themeVM.error || themeVM.loading) return;
    this.setState({
      theme: themeVM.currentTheme,
      currentTheme: ThemeVC.getInstance()._model.currentThemeId,
    });
  };

  private _onSvcUpdated = (model) => {
    if (model.loading || model.error) return;

    this.setState({
      data: model?.data,
    });
  };

  public componentWillUnmount() {
    ThemeVC.getInstance().unsubscribe(this._onThemeVCUpdated);
  }

  public render() {
    const { data } = this.state;

    return (
      <div className="converters-table">
        <Header />

        {data?.map((item) => {
          return (
            <div className="row">
              <div className="item item-order">{item.ordr}</div>
              <div className="item item-name">{item.name_of_ind}</div>
              <div className="item item-unit">{item.unit}</div>
              <div className="item">{item.k1m}</div>
              <div className="item">{item.k1y}</div>
              <div className="item">{item.k2m}</div>
              <div className="item">{item.k2y}</div>
              <div className="item">{item.k3m}</div>
              <div className="item">{item.k3y}</div>
              <div className="item">{item.mp}</div>
              <div className="item">{item.mf}</div>
              <div className="item">{item.yp}</div>
              <div className="item">{item.yf}</div>
            </div>
          );
        })}
      </div>
    );
  }
}
