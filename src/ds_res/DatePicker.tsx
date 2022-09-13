import React from "react";
import "./DatePicker.scss";
import { MyService } from "../services/MyService";
import { ThemeVC } from "bi-internal/services";
import Button from "@mui/material/Button";
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
      value: new Date(),
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

    // console.log(model, "MODEL CurrentDate DatePicker");

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
    this._myService?.setFilter(dateFormat(this.state.value));
  };

  setToday = () => {
    this.setState({ value: dayjs(new Date()) });

    this._myService?.setCurrentDate(dateFormat(this.state.value));
  };

  public render() {
    const { value, dates } = this.state;
    const minDate = dates?.sort()[0];

    // console.log(value, "MY COMPONENT DATE-VALUE");

    return (
      <div className="wrapper">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Дата и время"
            inputFormat="DD/MM/YYYY"
            value={value}
            className="datepicker"
            onChange={this.handleChange}
            renderInput={(params) => <TextField {...params} />}
            disableFuture
            minDate={minDate}
          />
        </LocalizationProvider>

        <Button className="buttons" variant="contained" onClick={this.setToday}>
          Показать за сегодняшний день
        </Button>
      </div>
    );
  }
}
