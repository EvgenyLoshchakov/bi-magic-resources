import { AppConfig, BaseService } from "bi-internal/core";
import axios from "axios";

export interface IMyServiceModel {
  loading?: boolean;
  error?: string;
  data: any;
}
export class BlustFurnaceService extends BaseService<IMyServiceModel> {
  private readonly id: string | number;

  private constructor(koobId: string) {
    super({
      loading: false,
      error: null,
      data: [],
      dataEx3: [],
      dataEx4: [],
      dataEx5: [],
      dimensions: ["plan", "prog"],
    });

    this.id = koobId;
    const dimensions = [
      "plan",
      "prog",
      "fact",
      "domen_ceh",
      "domen_pech",
      "time_char",
    ];

    const dimensionsEx3 = ["value"];
    const dimensionsEx4 = ["value"];
    const dimensionsEx5 = ["value"];

    this.getKoobDataByCfg({
      with: "luxmsbi.custom_dp_3_6_ex1",
      columns: dimensions,
    }).then((data) => {
      this._updateWithData({
        data,
      });
    });

    this.getKoobDataByCfg({
      with: "luxmsbi.custom_dp_3_6_ex3",
      columns: dimensionsEx3,
    }).then((dataEx3) => {
      this._updateWithData({
        dataEx3,
      });
    });

    this.getKoobDataByCfg({
      with: "luxmsbi.custom_dp_3_6_ex4",
      columns: dimensionsEx4,
    }).then((dataEx4) => {
      this._updateWithData({
        dataEx4,
      });
    });

    this.getKoobDataByCfg({
      with: "luxmsbi.custom_dp_3_6_ex5",
      columns: dimensionsEx5,
    }).then((dataEx5) => {
      this._updateWithData({
        dataEx5,
      });
    });
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

  protected _dispose() {
    if (
      window.__BlustFurnaceService &&
      window.__BlustFurnaceService[String(this.id)]
    ) {
      delete window.__BlustFurnaceService[String(this.id)];
    }
    super._dispose();
  }
  public static createInstance(id: string | number): BlustFurnaceService {
    if (!window.__BlustFurnaceService) {
      window.__BlustFurnaceService = {};
    }
    if (!window.__BlustFurnaceService.hasOwnProperty(String(id))) {
      window.__BlustFurnaceService[String(id)] = new BlustFurnaceService(
        String(id)
      );
    }
    return window.__BlustFurnaceService[String(id)];
  }
}
