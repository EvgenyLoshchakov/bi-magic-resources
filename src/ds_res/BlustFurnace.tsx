import React from "react";
import "./styles.scss";
import Header from "./BlustFurnace/components/Header";
import Footer from "./BlustFurnace/components/Footer";
import Furnace from "./BlustFurnace/components/Furnace";
import { BlustFurnaceService } from "../services/BlustFurnace";
import { ThemeVC } from "bi-internal/services";

export default class BlustFurnace extends React.Component<any> {
  private _BlustFurnaceService: BlustFurnaceService;
  public _chart: any = null;

  public state: {
    data: any;
    dataEx3: any;
    dataEx4: any;
    dataEx5: any;
  };

  public constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataEx3: [],
      dataEx4: [],
      dataEx5: [],
    };
  }

  public componentDidMount(): void {
    ThemeVC.getInstance().subscribeUpdatesAndNotify(this._onThemeVCUpdated);
    const { cfg } = this.props;
    const koob = cfg.getRaw().koob || "luxmsbi.custom_dp_3_6_ex_1";
    this._BlustFurnaceService = BlustFurnaceService.createInstance(koob);
    this._BlustFurnaceService.subscribeUpdatesAndNotify(this._onSvcUpdated);
  }

  private _onThemeVCUpdated = (themeVM): void => {
    if (themeVM.error || themeVM.loading) return;
    this.setState({ theme: themeVM.currentTheme });
  };

  private _onSvcUpdated = (model) => {
    if (model.loading || model.error) return;

    this.setState({
      data: model?.data,
      dataEx3: model?.dataEx3,
      dataEx4: model?.dataEx4,
      dataEx5: model?.dataEx5,
    });
  };

  public componentWillUnmount() {
    ThemeVC.getInstance().unsubscribe(this._onThemeVCUpdated);
  }

  public filterData = (data, workshop, furnace) => {
    return data.filter(
      (item) => item.domen_ceh === workshop && item.domen_pech === furnace
    );
  };

  public render() {
    const { data } = this.state;

    console.log(this.state.dataEx3, "dataEx3");

    return (
      <div className="furnace-container">
        <div className="furnace-title">
          Онлайн-мониторинг за работой доменных печей
        </div>
        <Header />
        <Furnace
          data={this.filterData(data, "ДЦ-1", "ДП-5")}
          name="ДЦ-1"
          secondName="ДП-3"
          className="dc1"
          motionColor="#FFAD0F"
        />
        <Furnace
          data={this.filterData(data, "ДЦ-1", "ДП-4")}
          name="ДЦ-1"
          secondName="ДП-4"
          className="dc1"
          motionColor="#FDDB99"
        />
        <Furnace
          data={this.filterData(data, "ДЦ-1", "ДП-5")}
          name="ДЦ-1"
          secondName="ДП-5"
          className="dc1"
          motionColor="#78C98B"
        />
        <Furnace
          data={this.filterData(data, "ДЦ-2", "ДП-6")}
          name="ДЦ-2"
          secondName="ДП-6"
          className="dc2"
          motionColor="#eb6d6d"
        />
        <Furnace
          data={this.filterData(data, "ДЦ-2", "ДП-7")}
          name="ДЦ-2"
          secondName="ДП-7"
          className="dc2"
          motionColor="#FDDB99"
        />
        <Footer />
      </div>
    );
  }
}
