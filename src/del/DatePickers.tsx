// import React from "react";
// import cn from "classnames";
// import "./DatePickers.scss";
// import { DatePickerService } from "../services/ds/DatePickerService";
// import { UrlState } from "bi-internal/core";

// const PERIODTYPES = {
//   "1": "Год",
//   "2": "Квартал",
//   "3": "Месяц",
// };
// export default class DatePickers extends React.Component<any> {
//   private _datePickerService: DatePickerService;
//   public state: {
//     koob: string;
//     opened: boolean;
//     data: any;
//     selected: any;
//     currentPeriodTypeFrom: number;
//     currentPeriodTypeTo: number;
//     currentYearFrom: number;
//     currentYearTo: number;
//     currentPeriodFrom: number[];
//     currentPeriodTo: number[];
//     currentScenarioFrom: number;
//     currentScenarioTo: number;
//     error: string;
//     single: string;
//     viewTypes: any;
//     currentViewType: string;
//     defaultPeriodType: number;
//   };

//   public constructor(props) {
//     super(props);
//     this.state = {
//       koob: "",
//       opened: false,
//       data: [],
//       selected: {},
//       currentPeriodTypeFrom: 1,
//       currentPeriodTypeTo: 1,
//       currentYearFrom: 2021,
//       currentYearTo: 2021,
//       currentPeriodFrom: [205],
//       currentPeriodTo: [205],
//       currentScenarioFrom: 1,
//       currentScenarioTo: 1,
//       error: "",
//       single: "both",
//       viewTypes: [],
//       currentViewType: "graphic",
//       defaultPeriodType: null,
//     };
//   }
//   public componentDidMount(): void {
//     const { cfg } = this.props;
//     const koob = cfg.getRaw().koob;
//     this._datePickerService = DatePickerService.createInstance(koob);
//     this._datePickerService.subscribeUpdatesAndNotify(this._onSvcUpdated);
//     UrlState.getInstance().subscribeUpdatesAndNotify(this._onUrlUpdated);
//   }
//   private _onUrlUpdated = (model) => {
//     if (model.loading || model.error) return;
//     const { cfg } = this.props;
//     const cfgRaw = cfg.getRaw();
//     const viewTypes = cfgRaw.hasOwnProperty("viewTypes")
//       ? cfgRaw.viewTypes
//       : [];

//     if (viewTypes.length) {
//       if (model.hasOwnProperty("viewType")) {
//         this.setState({
//           currentViewType: model.viewType ? model.viewType : "graphic",
//           viewTypes,
//         });
//       } else {
//         const defaultType = viewTypes.find(
//           (el) => el.hasOwnProperty("default") && el.default == true
//         );
//         this.setState({
//           currentViewType: defaultType ? defaultType.type : "graphic",
//           viewTypes,
//         });
//       }
//     }
//   };
//   private _onSvcUpdated = (model) => {
//     if (model.loading || model.error) return;

//     const { cfg } = this.props;
//     const single = cfg.getRaw().single || "both";
//     const defaultPeriodType = cfg.getRaw().defaultPeriodType || null;

//     this.setState({
//       data: model.data,
//       currentPeriodTypeFrom: model.currentPeriodTypeFrom,
//       currentPeriodTypeTo: model.currentPeriodTypeTo,
//       currentYearFrom: model.currentYearFrom,
//       currentYearTo: model.currentYearTo,
//       currentPeriodFrom: model.currentPeriodFrom,
//       currentPeriodTo: model.currentPeriodTo,
//       currentScenarioFrom: model.currentScenarioFrom,
//       currentScenarioTo: model.currentScenarioTo,
//       single,
//       defaultPeriodType,
//     });
//   };

//   public renderRadio = (idx, type, id, title, checked, onChange = () => {}) => {
//     return (
//       <label className="DatePickers__Radio" key={idx}>
//         <span className="DatePickers__Radio__Title" title={title}>
//           {title}
//         </span>
//         <input type="radio" checked={checked} onChange={onChange} />
//         <span className={cn("radiomark", String(checked))} />
//       </label>
//     );
//   };
//   public renderCheckbox = (
//     idx,
//     type,
//     id,
//     title,
//     checked,
//     onChange = () => {}
//   ) => {
//     return (
//       <label className="DatePickers__Radio" key={idx}>
//         <span className="DatePickers__Radio__Title" title={title}>
//           {title}
//         </span>
//         <input type="checkbox" checked={checked} onChange={onChange} />
//         <span className={cn("checkmark", String(checked))} />
//       </label>
//     );
//   };
//   public renderBadge = (idx, type, id, title, checked, onChange = () => {}) => {
//     return (
//       <label className="DatePickers__Badge" key={idx}>
//         <input type="radio" checked={checked} onChange={onChange} />
//         <span
//           className={cn("DatePickers__Badge__Title", String(checked))}
//           title={title}
//         >
//           {title}
//         </span>
//       </label>
//     );
//   };
//   public componentWillUnmount(): void {
//     // this._datePickerService.unsubscribe(this._onSvcUpdated);
//     // this._datePickerService = null;
//     UrlState.getInstance().unsubscribe(this._onUrlUpdated);
//   }
//   public onTitleClick = () => {
//     const { opened } = this.state;
//     this.setState({ opened: !opened });
//   };
//   public onCancelClick = () => {
//     this.setState({ opened: false });
//   };
//   public onSubmitClick = () => {
//     const {
//       currentPeriodTypeFrom,
//       currentPeriodTypeTo,
//       currentYearFrom,
//       currentYearTo,
//       currentPeriodFrom,
//       currentPeriodTo,
//       currentScenarioFrom,
//       currentScenarioTo,
//     } = this.state;

//     let opened = true;
//     let error = "";

//     if (
//       currentYearFrom &&
//       currentYearTo &&
//       currentPeriodFrom.length &&
//       currentPeriodTo.length
//     ) {
//       this._datePickerService?.setFilter(
//         currentPeriodTypeFrom,
//         currentPeriodTypeTo,
//         currentYearFrom,
//         currentYearTo,
//         currentPeriodFrom,
//         currentPeriodTo,
//         currentScenarioFrom,
//         currentScenarioTo
//       );
//       opened = false;
//     } else {
//       error = "Вы указали не все необходимые опции";
//       opened = true;
//     }

//     this.setState({ opened: opened, error: error });
//   };

//   public isChecked = (dimId, elemId, position = "from") => {
//     const {
//       data,
//       currentPeriodTypeFrom,
//       currentPeriodTypeTo,
//       currentYearFrom,
//       currentYearTo,
//       currentPeriodFrom,
//       currentPeriodTo,
//       currentScenarioFrom,
//       currentScenarioTo,
//     } = this.state;
//     let checked = false;

//     switch (dimId) {
//       case "period_name":
//         checked =
//           position == "from"
//             ? currentPeriodTypeFrom == elemId
//             : currentPeriodTypeTo == elemId;
//         break;
//       case "year":
//         checked =
//           position == "from"
//             ? currentYearFrom == elemId
//             : currentYearTo == elemId;
//         break;
//       case "period":
//         checked =
//           position == "from"
//             ? currentPeriodFrom.includes(elemId)
//             : currentPeriodTo.includes(elemId);
//         break;
//       case "scenario":
//         checked =
//           position == "from"
//             ? currentScenarioFrom == elemId
//             : currentScenarioTo == elemId;
//         break;
//     }
//     return checked;
//   };

//   public getPeriodType = (id, type, year) => {
//     const { data } = this.state;
//     if (data.length) {
//       return (
//         data
//           .find((el) => el.id == type)
//           ?.elements.find(
//             (el) =>
//               el.year == year && el[type == 1 ? "scenario" : "period"] == id
//           )?.title || ""
//       );
//     } else return "";
//   };

//   public buildSelectTitle = () => {
//     const {
//       currentPeriodTypeFrom,
//       currentPeriodTypeTo,
//       currentYearFrom,
//       currentYearTo,
//       currentPeriodFrom,
//       currentPeriodTo,
//       currentScenarioFrom,
//       currentScenarioTo,
//       single,
//     } = this.state;
//     const leftTitle = `${this._datePickerService?.getBranchTitleById(
//       "year",
//       currentYearFrom,
//       "from"
//     )} ${
//       currentPeriodTypeFrom == 1
//         ? this.getPeriodType(
//             currentScenarioFrom,
//             currentPeriodTypeFrom,
//             currentYearFrom
//           )
//         : currentPeriodFrom.length > 1
//         ? `${this.getPeriodType(
//             currentPeriodFrom[0],
//             currentPeriodTypeFrom,
//             currentYearFrom
//           )} - ${this.getPeriodType(
//             currentPeriodFrom[currentPeriodFrom.length - 1],
//             currentPeriodTypeFrom,
//             currentYearFrom
//           )}`
//         : this.getPeriodType(
//             currentPeriodFrom[0],
//             currentPeriodTypeFrom,
//             currentYearFrom
//           )
//     }`;
//     const rightTitle = `${this._datePickerService?.getBranchTitleById(
//       "year",
//       currentYearTo,
//       "to"
//     )} ${
//       currentPeriodTypeTo == 1
//         ? this.getPeriodType(
//             currentScenarioTo,
//             currentPeriodTypeTo,
//             currentYearTo
//           )
//         : currentPeriodTo.length > 1
//         ? `${this.getPeriodType(
//             currentPeriodTo[0],
//             currentPeriodTypeTo,
//             currentYearTo
//           )} - ${this.getPeriodType(
//             currentPeriodTo[currentPeriodTo.length - 1],
//             currentPeriodTypeTo,
//             currentYearTo
//           )}`
//         : this.getPeriodType(
//             currentPeriodTo[0],
//             currentPeriodTypeTo,
//             currentYearTo
//           )
//     }`;
//     return single != "both"
//       ? single == "left"
//         ? `${leftTitle}`
//         : `${rightTitle}`
//       : `${leftTitle} - ${rightTitle}`;
//   };
//   public setScenarios = (id, position, isRadio = false) => {
//     const { currentPeriodFrom, currentPeriodTo } = this.state;
//     let scenarios = position == "from" ? currentPeriodFrom : currentPeriodTo;
//     scenarios = isRadio
//       ? [...scenarios, id]
//       : scenarios.includes(id)
//       ? scenarios.filter((el) => el != id)
//       : [...scenarios, id];
//     this.setState(
//       position == "from"
//         ? { currentPeriodFrom: scenarios }
//         : { currentPeriodTo: scenarios }
//     );
//   };
//   public render() {
//     const {
//       opened,
//       data,
//       currentPeriodTypeFrom,
//       currentPeriodTypeTo,
//       currentYearFrom,
//       currentYearTo,
//       currentPeriodFrom,
//       currentPeriodTo,
//       error,
//       single,
//       defaultPeriodType,
//       viewTypes,
//       currentViewType,
//     } = this.state;

//     return (
//       <div className="DatePickers">
//         <div className={cn("DatePickers__Select", { active: opened })}>
//           <div className="DatePickers__SelectTitle" onClick={this.onTitleClick}>
//             <DatePickerIcon />
//             <div className="DatePickers__SelectTitle__Text">
//               {this.buildSelectTitle()}
//             </div>
//           </div>
//           {!!data.length && (
//             <div className="DatePickers__SelectList">
//               {error != "" && <div className="error">{error}</div>}
//               {single != "right" && (
//                 <div className="DatePickers__SelectList__Item">
//                   {!defaultPeriodType && (
//                     <div className="DatePickers__SelectList__Group">
//                       {data?.map((elem, i) =>
//                         this.renderRadio(
//                           `period_name_${i}`,
//                           "period_type",
//                           elem.id,
//                           PERIODTYPES[elem.id],
//                           this.isChecked("period_name", elem.id, "from"),
//                           () =>
//                             this.setState({
//                               currentPeriodTypeFrom: elem.id,
//                               currentYearFrom: elem.elements[0].year,
//                               currentPeriodFrom: [],
//                             })
//                         )
//                       )}
//                     </div>
//                   )}
//                   <div className="DatePickers__SelectList__Group">
//                     {data
//                       ?.find((el) => el.id == currentPeriodTypeFrom)
//                       .years.map((elem, i) =>
//                         this.renderBadge(
//                           `period_${i}`,
//                           "year",
//                           elem,
//                           elem,
//                           this.isChecked("year", elem, "from"),
//                           () =>
//                             this.setState({
//                               currentYearFrom: elem,
//                               currentPeriodFrom: [],
//                             })
//                         )
//                       )}
//                   </div>
//                   <div className="DatePickers__SelectList__Group">
//                     {data
//                       ?.find((el) => el.id == currentPeriodTypeFrom)
//                       .elements.filter((el) => el.year == currentYearFrom)
//                       .map((elem, i) =>
//                         currentPeriodTypeFrom == 1
//                           ? this.renderRadio(
//                               `scenario_${i}`,
//                               "scenario",
//                               elem.scenario,
//                               elem.title,
//                               this.isChecked("scenario", elem.scenario, "from"),
//                               () => {
//                                 this.setScenarios(elem.period, "from", true);
//                                 this.setState({
//                                   currentScenarioFrom: elem.scenario,
//                                 });
//                               }
//                             )
//                           : this.renderCheckbox(
//                               `scenario_${i}`,
//                               "period",
//                               elem.period,
//                               elem.title,
//                               this.isChecked("period", elem.period, "from"),
//                               () => this.setScenarios(elem.period, "from")
//                             )
//                       )}
//                   </div>
//                 </div>
//               )}
//               {single != "left" && (
//                 <div className="DatePickers__SelectList__Item">
//                   {!defaultPeriodType && (
//                     <div className="DatePickers__SelectList__Group">
//                       {data?.map((elem, i) =>
//                         this.renderRadio(
//                           `period_name_${i}`,
//                           "period_type",
//                           elem.id,
//                           PERIODTYPES[elem.id],
//                           this.isChecked("period_name", elem.id, "to"),
//                           () =>
//                             this.setState({
//                               currentPeriodTypeTo: elem.id,
//                               currentYearTo: elem.elements[0].year,
//                               currentPeriodTo: [],
//                             })
//                         )
//                       )}
//                     </div>
//                   )}
//                   <div className="DatePickers__SelectList__Group">
//                     {data
//                       ?.find((el) => el.id == currentPeriodTypeTo)
//                       .years.map((elem, i) =>
//                         this.renderBadge(
//                           `period_${i}`,
//                           "year",
//                           elem,
//                           elem,
//                           this.isChecked("year", elem, "to"),
//                           () =>
//                             this.setState({
//                               currentYearTo: elem,
//                               currentPeriodTo: [],
//                             })
//                         )
//                       )}
//                   </div>
//                   <div className="DatePickers__SelectList__Group">
//                     {data
//                       ?.find((el) => el.id == currentPeriodTypeTo)
//                       .elements.filter((el) => el.year == currentYearTo)
//                       .map((elem, i) =>
//                         currentPeriodTypeTo == 1
//                           ? this.renderRadio(
//                               `scenario_${i}`,
//                               "scenario",
//                               elem.scenario,
//                               elem.title,
//                               this.isChecked("scenario", elem.scenario, "to"),
//                               () => {
//                                 this.setScenarios(elem.period, "to", true);
//                                 this.setState({
//                                   currentScenarioTo: elem.scenario,
//                                 });
//                               }
//                             )
//                           : this.renderCheckbox(
//                               `scenario_${i}`,
//                               "period",
//                               elem.period,
//                               elem.title,
//                               this.isChecked("period", elem.period, "to"),
//                               () => this.setScenarios(elem.period, "to")
//                             )
//                       )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//           <div className="DatePickers__SelectButtons">
//             <div
//               className="DatePickers__SelectButton"
//               onClick={this.onCancelClick}
//             >
//               Отмена
//             </div>
//             <div
//               className="DatePickers__SelectButton active"
//               onClick={this.onSubmitClick}
//             >
//               Применить
//             </div>
//           </div>
//         </div>
//         {!!viewTypes.length && (
//           <div className="ViewTypes">
//             {viewTypes.map((viewType) => (
//               <div
//                 className={cn("ViewTypes__item", {
//                   active: currentViewType == viewType.type,
//                 })}
//                 onClick={() =>
//                   UrlState.getInstance().navigate({ viewType: viewType.type })
//                 }
//               >
//                 {viewType.title}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }
// }
