import { AppConfig, BaseService } from "bi-internal/core";
import axios from "axios";

export interface IMyServiceModel {
  loading?: boolean;
  error?: string;
  data: any;
  filters: any;
  dimensions: any;
  currentDate: any;
}
export class MyService extends BaseService<IMyServiceModel> {
  private readonly id: string | number;

  private constructor(koobId: string) {
    super({
      loading: false,
      error: null,
      data: [],
      dimensions: ["acc_date"],
      currentDate: "",
    });

    this.id = koobId;
    const dimensions = ["acc_date"];

    this.getKoobDataByCfg({
      with: "luxmsbi.custom_melt_steel_oper_newation_4",
      columns: dimensions,
    }).then((data) => {
      const dates = data.map((item) => item.acc_date);
      let uniqueDates = dates?.filter((item, i, ar) => ar.indexOf(item) === i);

      this._updateWithData({
        data,
        currentDate: uniqueDates.sort().at(-1),
      });
    });
  }

  public setCurrentDate(date: any) {
    this._updateWithData({ currentDate: date });
  }

  public async getKoobDataByCfg(cfg): Promise<any> {
    const url: string = AppConfig.fixRequestUrl(`/api/v3/koob/data`);
    const columns = cfg.columns;

    let filters = {};
    if (cfg.filters) filters = { ...cfg.filters };

    const body: any = {
      with: cfg.with,
      columns,
      filters,
    };

    if (cfg.offset) body.offset = cfg.offset;
    if (cfg.limit) body.limit = cfg.limit;
    if (cfg.sort) body.sort = cfg.sort;
    if (cfg.options) body.options = cfg.options;
    if (cfg.subtotals?.length) body.subtotals = cfg.subtotals;

    if (cfg.distinct) {
      body.distinct = [];
    }

    try {
      const response = await axios({
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/stream+json",
        },
        data: body,
        cancelToken: cfg.cancelToken,
      });

      let data = response.data;

      if (
        String(response.headers["content-type"]).startsWith(
          "application/stream+json"
        )
      ) {
        if (typeof data === "string") {
          data = data
            .split("\n")
            .filter((line: string) => !!line)
            .map((line: string) => JSON.parse(line));
        } else if (data && typeof data === "object" && !Array.isArray(data)) {
          data = [data];
        }
      }

      return data;
    } catch (e) {
      return "";
    }
  }

  // private setFilter(currentDate) {
  //   this._updateWithData({ currentDate });
  // }

  protected _dispose() {
    if (window.__myService && window.__myService[String(this.id)]) {
      delete window.__myService[String(this.id)];
    }
    super._dispose();
  }
  public static createInstance(id: string | number): MyService {
    if (!window.__myService) {
      window.__myService = {};
    }
    if (!window.__myService.hasOwnProperty(String(id))) {
      window.__myService[String(id)] = new MyService(String(id));
    }
    return window.__myService[String(id)];
  }
}
