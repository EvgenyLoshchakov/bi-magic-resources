// import React from "react";
// import cn from "classnames";
// import * as echarts from "echarts";
// import formatNumberWithString from "format-number-with-string";
// import { ThemeVC } from "bi-internal/services";
// import { MiningService } from "../services/ds/MiningService";
// import { DatePickerService } from "../services/ds/DatePickerService";
// import "./Common.scss";
// import "./FactorAnalyse.scss";
// import { modalContainer } from "bi-internal/ui";
// import { bi } from "bi-internal/utils";
// import { UrlState } from "bi-internal/core";

// const tableColumns = [
//   { id: "business", title: "" },
//   { id: "value_rub_t", title: "₽/т." },
//   { id: "value_mil_rub", title: "млн. ₽" },
//   { id: "value_t", title: "тыс.т." },
// ];

// export default class FactorAnalyse extends React.Component<any> {
//   private _miningService: MiningService;
//   private _datePickerService: DatePickerService;
//   public _chart: any = null;
//   public state: {
//     data: any;
//     rawData: any;
//     table: any;
//     theme: any;
//     vizelTitle: string;
//     groups: any;
//     currentViewType: string;
//     currentPeriodToTitle: string;
//     sort: string;
//   };

//   public constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       rawData: [],
//       table: [],
//       theme: {},
//       vizelTitle: "",
//       groups: [],
//       currentViewType: "graphic",
//       currentPeriodToTitle: "",
//       sort: "",
//     };
//   }

//   public componentDidMount(): void {
//     ThemeVC.getInstance().subscribeUpdatesAndNotify(this._onThemeVCUpdated);
//     const { cfg } = this.props;
//     const koob = cfg.getRaw().koob;
//     this._datePickerService = DatePickerService.createInstance(koob);
//     this._datePickerService.subscribeUpdatesAndNotify(this._onSvcUpdated);
//     UrlState.getInstance().subscribeUpdatesAndNotify(this._onUrlUpdated);
//   }

//   // private _onUrlUpdated = (model) => {
//   //   if (model.loading || model.error) return;
//   //   if (model.hasOwnProperty("viewType")) {
//   //     this.setState({
//   //       currentViewType: model.viewType ? model.viewType : "graphic",
//   //     });
//   //   } else {
//   //     this.setState({ currentViewType: "graphic" });
//   //   }
//   // };

//   // private _onThemeVCUpdated = (themeVM): void => {
//   //   if (themeVM.error || themeVM.loading) return;
//   //   this.setState({ theme: themeVM.currentTheme });
//   // };

//   private _onSvcUpdated = (model) => {
//     const { cfg } = this.props;
//     const koob = cfg.getRaw().koob;
//     const groups = cfg.getRaw().groups || [];
//     const filters = cfg.getRaw().dataSource?.filters || {};

//     const currentType = filters.hasOwnProperty("id_tab")
//       ? filters["id_tab"][1]
//       : 1;

//     if (model.loading || model.error) return;

//     let period_names = [];
//     let periods = [];
//     let scenarios = [];

//     if (model.currentPeriodTypeTo == 1) {
//       if (!scenarios.includes(model.currentScenarioTo)) {
//         scenarios.push(model.currentScenarioTo);
//       }
//       model.currentPeriodTo.map((id) => {
//         if (!periods.includes(id)) {
//           periods.push(id);
//         }
//       });
//     } else {
//       model.currentPeriodTo.map((id) => {
//         if (!periods.includes(id)) {
//           periods.push(id);
//         }
//       });
//     }
//     if (!period_names.includes(model.currentPeriodTypeFrom)) {
//       period_names.push(model.currentPeriodTypeFrom);
//     }
//     if (!period_names.includes(model.currentPeriodTypeTo)) {
//       period_names.push(model.currentPeriodTypeTo);
//     }

//     period_names = period_names.length
//       ? ["="].concat(period_names.sort())
//       : undefined;
//     periods = periods.length ? ["="].concat(periods.sort()) : undefined;
//     scenarios = scenarios.length ? ["="].concat(scenarios.sort()) : undefined;

//     this._datePickerService
//       .getKoobDataByCfg({
//         with: koob,
//         columns: [
//           "value_mil_rub",
//           "value_t",
//           "value_rub_t",
//           "id",
//           "parent_id",
//           "parent_sort_id",
//           "period",
//           "period_name",
//           "scenario",
//           "business",
//         ],
//         filters: {
//           ...filters,
//           do_name: ["=", 489],
//           period_name: period_names,
//           period: periods,
//           scenario: scenarios,
//         },
//         sort: ["+id"],
//       })
//       .then((data) => {
//         const vizelTitle =
//           currentType == 1
//             ? `Факт ${Number(model.currentYearFrom) - 1}`
//             : `Бизнес-план ${model.currentYearFrom}`;
//         const groupsData = groups.map((group) => {
//           let newGroup = {
//             title: group.title,
//             unit: group.unit,
//             elements: group.id.map((id) => {
//               const currentElement = data.find((el) => el.id == id);
//               return {
//                 id,
//                 title: currentElement ? currentElement.business : "",
//                 value: currentElement ? currentElement[group.measure] : 0,
//                 unit: group.unit,
//               };
//             }),
//           };
//           return newGroup;
//         });

//         let table = [];
//         let tableStructure = [];

//         data
//           .sort((a, b) =>
//             a.parent_id != b.parent_id ? a.parent_id - b.parent_id : a.id - b.id
//           )
//           .map((el) => {
//             if (el.parent_id == null) {
//               const currentElement = tableStructure.find(
//                 (elem) => elem.id == el.id
//               );
//               if (!currentElement) {
//                 tableStructure.push({
//                   id: el.id,
//                   parent_sort_id: el.parent_sort_id,
//                   elements: [el],
//                   title: el.business,
//                 });
//               }
//             } else {
//               const currentElement = tableStructure.find(
//                 (elem) => elem.id == el.parent_id
//               );
//               if (currentElement) {
//                 currentElement.elements.push(el);
//               }
//             }
//           });

//         console.log(
//           tableStructure.sort((a, b) => a.parent_sort_id - b.parent_sort_id)
//         );

//         this.setState({
//           currentPeriodToTitle: this._datePickerService.getTitle("to"),
//           rawData: data,
//           table: (tableStructure.map((el) => el.elements) as any).flat(),
//           data: data.filter(
//             (el) =>
//               el.parent_id == null &&
//               el.business != "норм" &&
//               el.business != "Реестр норм"
//           ),
//           vizelTitle,
//           groups: groupsData,
//         });
//       });
//   };

//   public componentWillUnmount() {
//     ThemeVC.getInstance().unsubscribe(this._onThemeVCUpdated);
//   }

//   public onChartClick = (event) => {
//     const { data, rawData } = this.state;
//     const dataset = this.props.cfg.getDataset();
//     const currentObject = data.find((el) => el.business == event.name);

//     if (currentObject) {
//       modalContainer.push(
//         {
//           dp: dataset.getDataProvider(),
//           cfg: dataset.createVizelConfig({
//             view_class: "internal",
//             currentObject: {
//               id: currentObject.id,
//               title: event.name,
//               value: event.data.rawValue,
//             },
//             data: rawData.filter(
//               (el) => el.parent_id == currentObject.id && el.business != "норм"
//             ),
//             url: "res:ds_res:FactorModal.js",
//           }),
//           subspace: bi.createSimpleSubspace({}),
//         },
//         event.name
//       );
//     }
//   };

//   public getSeries = (info, name, theme) => {
//     let basicValues = info.map((el) => el.value_t);
//     let currentOffset = 0;
//     let waterfallValues = basicValues.map((val) => ({
//       offset: 0,
//       value: val,
//       delta: 0,
//       absDelta: 0,
//     }));
//     basicValues.map((val, i) => {
//       if (i <= 1 || i == basicValues.length - 1) {
//         waterfallValues[i] = {
//           offset: 0,
//           value: val,
//           delta: val,
//           absDelta: Math.abs(val),
//         };
//       } else {
//         let delta = val - basicValues[i - 1];
//         let absDelta = Math.abs(val - basicValues[i - 1]);
//         let offset = 0;
//         if (i == 2) {
//           currentOffset = basicValues[i - 1];
//           if (delta > 0) {
//             offset = currentOffset + absDelta;
//           } else {
//             offset = currentOffset - absDelta;
//             currentOffset = offset;
//           }
//           if (i + 1 <= waterfallValues.length - 1) {
//             waterfallValues[i + 1].offset = offset;
//           }
//           waterfallValues[i] = {
//             offset: currentOffset,
//             value: val,
//             delta: delta,
//             absDelta: Math.abs(val),
//           };
//           currentOffset = offset;
//         } else {
//           currentOffset = waterfallValues[i].offset;
//           if (delta > 0) {
//             offset = currentOffset + absDelta;
//           } else {
//             offset = currentOffset - absDelta;
//             currentOffset = offset;
//           }
//           if (i + 1 <= waterfallValues.length - 1) {
//             waterfallValues[i + 1].offset = offset;
//           }
//           waterfallValues[i] = {
//             offset: currentOffset,
//             value: val,
//             delta: delta,
//             absDelta: Math.abs(val),
//           };
//           currentOffset = offset;
//         }
//       }
//     });

//     let infoPlaceholder = {};
//     let infoNew = {};
//     info.map((el, i) => {
//       infoPlaceholder[el.business] = waterfallValues[i].delta;
//     });
//     info.map((el, i) => {
//       infoNew[el.business] = waterfallValues[i].offset;
//     });
//     return [
//       {
//         type: "bar",
//         name,
//         stack: `factor`,
//         silent: true,
//         data: Object.keys(infoNew).map((factor, i) => {
//           return {
//             name: factor,
//             value: infoNew[factor],
//             rawValue: infoNew[factor],
//             itemStyle: {
//               color: "transparent",
//             },
//             label: {
//               show: false,
//               position: "top",
//               fontWeight: 400,
//               color: theme.color1,
//               borderColor: "transparent",
//               shadowColor: "transparent",
//               textShadowColor: "transparent",
//             },
//           };
//         }),
//       },
//       {
//         type: "bar",
//         name,
//         stack: `factor`,
//         data: Object.keys(infoPlaceholder).map((factor, i) => {
//           return {
//             name: factor,
//             value: Math.abs(infoPlaceholder[factor]),
//             rawValue: infoPlaceholder[factor],
//             itemStyle: {
//               color:
//                 factor.indexOf("Факт") != -1 || factor.indexOf("Прогноз") != -1
//                   ? "#2FB4E9"
//                   : factor.indexOf("Бизнес-план") != -1
//                   ? "#0070BA"
//                   : infoPlaceholder[factor] < 0
//                   ? "#0EA64D"
//                   : "#FF4831",
//             },
//             label: {
//               show: true,
//               formatter: (params) => {
//                 const value =
//                   infoPlaceholder[
//                     Object.keys(infoPlaceholder)[params.dataIndex]
//                   ];
//                 return value ? parseFloat(value).toFixed(2) : 0;
//               },
//               fontSize: 12,
//               position:
//                 factor.indexOf("Факт") != -1 ||
//                 factor.indexOf("Бизнес-план") != -1
//                   ? "top"
//                   : infoPlaceholder[factor] > 0
//                   ? "top"
//                   : "bottom",
//               fontWeight: 400,
//               color:
//                 factor.indexOf("Факт") != -1 ||
//                 factor.indexOf("Бизнес-план") != -1 ||
//                 factor.indexOf("Прогноз") != -1
//                   ? theme.color1
//                   : infoPlaceholder[factor] < 0
//                   ? "#0EA64D"
//                   : "#FF4831",
//               borderColor: "transparent",
//               shadowColor: "transparent",
//               textShadowColor: "transparent",
//             },
//           };
//         }),
//       },
//     ];
//   };

//   public onSetupContainer = (
//     container,
//     dataSrc,
//     theme,
//     currentPeriodToTitle
//   ) => {
//     if (dataSrc && dataSrc.length && container && theme) {
//       const { cfg } = this.props;
//       const filters = cfg.getRaw().dataSource?.filters || {};

//       const currentType = filters.hasOwnProperty("id_tab")
//         ? filters["id_tab"][1]
//         : 1;

//       const firstElement =
//         currentType == 1
//           ? dataSrc.filter(
//               (el) =>
//                 el.business.indexOf("Факт") != -1 &&
//                 el.business.indexOf("норм") == -1
//             )
//           : dataSrc.filter(
//               (el) =>
//                 el.business.indexOf("Бизнес-план") != -1 &&
//                 el.business.indexOf("норм") == -1
//             );
//       const secondElement =
//         currentType == 1
//           ? dataSrc.filter(
//               (el) =>
//                 el.business.indexOf("Факт") != -1 &&
//                 el.business.indexOf("норм") != -1
//             )
//           : dataSrc.filter(
//               (el) =>
//                 el.business.indexOf("Бизнес-план") != -1 &&
//                 el.business.indexOf("норм") != -1
//             );

//       const lastElement =
//         currentType == 1
//           ? dataSrc.filter((el) => el.business.indexOf("Прогноз") != -1)
//           : dataSrc.filter((el) => el.business.indexOf("Прогноз") != -1);

//       const other =
//         currentType == 1
//           ? dataSrc.filter(
//               (el) =>
//                 el.business.indexOf("Факт") == -1 &&
//                 el.business.indexOf("Прогноз") == -1
//             )
//           : dataSrc.filter(
//               (el) =>
//                 el.business.indexOf("Бизнес-план") == -1 &&
//                 el.business.indexOf("Прогноз") == -1
//             );

//       const data = firstElement
//         .concat(secondElement)
//         .concat(other.sort((a, b) => a.id - b.id))
//         .concat(lastElement);

//       let config = {
//         grid: {
//           left: "3%",
//           top: "14%",
//           right: "4%",
//           bottom: "3%",
//           containLabel: true,
//         },
//         tooltip: {
//           show: true,
//           appendToBody: true,
//           triggerOn: "mousemove",
//         },
//         xAxis: {
//           type: "category",
//           data: data.map((el) =>
//             el.business.indexOf("Прогноз") != -1
//               ? this.getCurrentPeriodTitle(currentPeriodToTitle)
//               : el.business
//           ),
//           axisLabel: {
//             color: theme.color1,
//             interval: 0,
//             fontSize: 10,
//             rotate: 30,
//           },
//           splitLine: {
//             lineStyle: {
//               color: theme.color12,
//             },
//           },
//           axisTick: {
//             lineStyle: {
//               color: theme.color1,
//             },
//           },
//         },
//         yAxis: {
//           type: "value",
//           axisLabel: {
//             color: theme.color1,
//           },
//           splitLine: {
//             lineStyle: {
//               color: theme.color12,
//             },
//           },
//           axisTick: {
//             lineStyle: {
//               color: theme.color1,
//             },
//           },
//         },
//         series: this.getSeries(data, "", theme),
//       };
//       if (this._chart) {
//         this._chart.clear();
//         this._chart.setOption(config);
//       } else {
//         this._chart = echarts.init(container, null, { renderer: "svg" });
//         this._chart.setOption(config);
//       }
//       this._chart.resize(container.offsetWidth, container.offsetHeight);
//       this._chart.on("click", "series", this.onChartClick);
//     } else {
//       if (this._chart) {
//         this._chart.clear();
//         this._chart = null;
//       }
//     }
//   };

//   private getCurrentPeriodTitle = (title) => {
//     if (!title) return "";
//     const splitted = title.split(" ");
//     const newTitle = splitted.length
//       ? splitted.slice(1).concat(splitted.slice(0, 1)).join(" ")
//       : title;
//     return newTitle;
//   };

//   private sortTableBy = (column) => {
//     const { sort, table } = this.state;
//     const dir = sort == "" ? "+" : sort.indexOf("+") != -1 ? "-" : "+";
//     const sortedTable = table.sort((a, b) =>
//       dir == "+" ? a[column] - b[column] : b[column] - a[column]
//     );
//     this.setState({ sort: `${dir}${column}`, table: sortedTable });
//   };

//   public render() {
//     const {
//       data,
//       currentPeriodToTitle,
//       table,
//       theme,
//       vizelTitle,
//       groups,
//       currentViewType,
//     } = this.state;
//     return (
//       <div className="ComponentWrapper ComponentWrapper__viewTypeContainer">
//         <div className="VizelTitle">{vizelTitle}</div>
//         {!!data.length && (
//           <>
//             <div
//               className={cn(
//                 "ComponentWrapper__viewType FactorAnalyse graphic",
//                 {
//                   hidden: currentViewType == "table",
//                 }
//               )}
//             >
//               <div className="FactorAnalyse__list">
//                 {groups.map((group) => (
//                   <div className="FactorAnalyse__item">
//                     <div className="FactorAnalyse__title">{group.title}</div>
//                     {group.elements.map((item) => (
//                       <div className="ValueWithArrowTitle">
//                         <div className="ValueWithArrowTitle__title">
//                           <span
//                             title={
//                               item.title.indexOf("Прогноз") != -1
//                                 ? this.getCurrentPeriodTitle(
//                                     currentPeriodToTitle
//                                   )
//                                 : item.title
//                             }
//                           >
//                             {item.title.indexOf("Прогноз") != -1
//                               ? this.getCurrentPeriodTitle(
//                                   this._datePickerService?.getTitle("to")
//                                 )
//                               : item.title}
//                           </span>
//                         </div>
//                         <div className="ValueWithArrowTitle__valueBlock">
//                           <div
//                             className={"ValueWithArrowTitle__valueBlock__value"}
//                           >{`${formatNumberWithString(
//                             item.value,
//                             "-# ###"
//                           )}`}</div>
//                         </div>
//                         <div className="ValueWithArrowTitle__periodsBlock">
//                           <div className="ValueWithArrowTitle__periodsBlock__period">
//                             <span>{item.unit}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//               <div
//                 className="ComponentWrapper__graph"
//                 ref={(el) =>
//                   this.onSetupContainer(el, data, theme, currentPeriodToTitle)
//                 }
//               ></div>
//             </div>
//             <div
//               className={cn("ComponentWrapper__viewType table", {
//                 hidden: currentViewType == "graphic",
//               })}
//             >
//               <table>
//                 <tr>
//                   {tableColumns.map((header) => (
//                     <th
//                       className={cn("ComponentWrapper__viewType__header")}
//                       data-id={header.id}
//                       onClick={() => this.sortTableBy(header.id)}
//                     >
//                       {header.title}
//                       <SortIcon />
//                     </th>
//                   ))}
//                 </tr>
//                 {table.map((row, i) => (
//                   <tr
//                     className={cn("ComponentWrapper__viewType__tr", {
//                       parent: row.parent_id == null,
//                       active: i == 0,
//                     })}
//                   >
//                     {tableColumns.map((header) => (
//                       <td>
//                         {typeof row[header.id] !== "string"
//                           ? formatNumberWithString(row[header.id], "-# ###.00")
//                           : row[header.id].indexOf("Прогноз") != -1
//                           ? this.getCurrentPeriodTitle(currentPeriodToTitle)
//                           : row[header.id]}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </table>
//             </div>
//           </>
//         )}
//         {!!!data.length && <div className="noData">Нет данных</div>}
//       </div>
//     );
//   }
// }
