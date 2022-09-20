import React from "react";
import "./styles.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Furnace from "./components/Furnace";
import { BlustFurnaceService } from "../../services/BlustFurnace";
import { ThemeVC } from "bi-internal/services";
import { DC1, DC2, DP3, DP4, DP5, DP6, DP7 } from "./constants";

export default class BlustFurnace extends React.Component<any> {
  private _BlustFurnaceService: BlustFurnaceService;
  public _chart: any = null;

  public state: {
    data: any;
    dataEx3: any;
    dataEx4: any;
    dataEx5: any;
    dataEx6: any;
    currentTheme: string;
  };

  public constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataEx3: [],
      dataEx4: [],
      dataEx5: [],
      dataEx6: [],
      currentTheme: "",
    };
  }

  public componentDidMount(): void {
    ThemeVC.getInstance().subscribeUpdatesAndNotify(this._onThemeVCUpdated);
    const { cfg } = this.props;
    const koob = cfg.getRaw().koob || "luxmsbi.custom_dp_3_6_ex_1";
    this._BlustFurnaceService = BlustFurnaceService.createInstance(koob);
    this._BlustFurnaceService.subscribeUpdatesAndNotify(this._onSvcUpdated);

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
      dataEx3: model?.dataEx3,
      dataEx4: model?.dataEx4,
      dataEx5: model?.dataEx5,
      dataEx6: model?.dataEx6,
    });
  };

  public componentWillUnmount() {
    ThemeVC.getInstance().unsubscribe(this._onThemeVCUpdated);
  }

  public filterData = (data, workshop, furnace) => {
    return data?.filter(
      (item) => item?.domen_ceh === workshop && item?.domen_pech === furnace
    );
  };

  public render() {
    const { data, dataEx3, dataEx4, dataEx5, dataEx6, currentTheme } =
      this.state;

    console.log(currentTheme, "currentTheme");

    return (
      <div className="furnace-container">
        <div className="furnace-title">
          Онлайн-мониторинг за работой доменных печей
        </div>

        <Header />

        <Furnace
          data={this.filterData(data, DC1, DP3)}
          dataEx6={dataEx6.filter((item) => item.dp === DP3)}
          name={DC1}
          className="dc1"
          currentTheme={currentTheme}
        />
        <Furnace
          data={this.filterData(data, DC1, DP4)}
          dataEx6={dataEx6.filter((item) => item.dp === DP4)}
          name={DC1}
          className="dc1"
          currentTheme={currentTheme}
        />
        <Furnace
          data={this.filterData(data, DC1, DP5)}
          dataEx6={dataEx6.filter((item) => item.dp === DP5)}
          name={DC1}
          className="dc1"
          currentTheme={currentTheme}
        />
        <Furnace
          data={this.filterData(data, DC2, DP6)}
          dataEx6={dataEx6.filter((item) => item.dp === DP6)}
          name={DC2}
          className="dc2"
          currentTheme={currentTheme}
        />
        <Furnace
          data={this.filterData(data, DC2, DP7)}
          dataEx6={dataEx6.filter((item) => item.dp === DP7)}
          name={DC2}
          className="dc2"
          currentTheme={currentTheme}
        />

        <Footer dataEx3={dataEx3} dataEx4={dataEx4} dataEx5={dataEx5} />
      </div>
    );
  }
}
