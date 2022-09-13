import React from "react";
import "./styles.scss";
import { MyService } from "../services/MyService";
import { ThemeVC } from "bi-internal/services";
import { dateFormat } from "../utils/dateformat";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default class MyCustomComponent extends React.Component<any> {
  private _myService: MyService;
  public _chart: any = null;

  public state: {
    data: any;
    theme: any;
    value: any;
    dates: any;
  };

  public constructor(props) {
    super(props);
    this.state = {
      data: [],
      theme: {},
      value: dayjs(new Date()),
      dates: [],
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
    if (model.loading || model.error) return;

    let uniqueDates = model.dates.filter(
      (item, i, ar) => ar.indexOf(item) === i
    );

    this.setState({ dates: uniqueDates });
  };

  public componentWillUnmount() {
    ThemeVC.getInstance().unsubscribe(this._onThemeVCUpdated);
  }

  handleChange = (newValue: Dayjs | null) => {
    this.setState({ value: newValue });

    const valueFormat = newValue?.format().slice(0, 11);
    this._myService?.setCurrentDate(`${valueFormat}00:00:00.000+00:00`);
  };

  setToday = () => {
    this.setState({ value: dayjs(new Date()) });
    this._myService?.setCurrentDate(dateFormat(new Date()));
  };

  public render() {
    const { value, dates } = this.state;
    const minDate = dates?.sort()[0];

    const valueFormat = value ? value?.format()?.slice(0, 10) : "";
    const currentDateFormat = dayjs(new Date()).format()?.slice(0, 10) || "";
    const isToday = valueFormat === currentDateFormat;

    return (
      <div className="wrapper">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Дата и время"
            inputFormat="DD/MM/YYYY"
            value={value}
            className="datepicker"
            onChange={this.handleChange}
            minDate={minDate}
            renderInput={(params) => <TextField {...params} />}
            disableFuture
            closeOnSelect
          />
        </LocalizationProvider>

        {isToday ? (
          <div className="button disable">Выбран сегодняшний день</div>
        ) : (
          <div className="button " onClick={this.setToday}>
            Показать за сегодня
          </div>
        )}
      </div>
    );
  }
}
