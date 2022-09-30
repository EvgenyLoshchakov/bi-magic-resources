import { AppConfig, BaseService } from "bi-internal/core";
import axios from "axios";

export interface IConverterIndicatorsService {
  loading?: boolean;
  error?: string;
  data: any;
}
export class ConverterIndicatorsService extends BaseService<IConverterIndicatorsService> {
  private readonly id: string | number;

  private constructor(koobId: string) {
    super({
      loading: false,
      error: null,
      data: [],
    });

    this.id = koobId;

    const dimensions = [
      "k1m",
      "k1y",
      "k2m",
      "k2y",
      "k3m",
      "k3y",
      "mf",
      "mp",
      "name_of_ind",
      "ordr",
      "unit",
      "yp",
      "yf",
    ];

    this.getKoobDataByCfg({
      with: "luxmsbi.custom_report_3_7_new",
      columns: dimensions,
    }).then((data) => {
      this._updateWithData({ data });
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
      window.__ConverterIndicatorsService &&
      window.__ConverterIndicatorsService[String(this.id)]
    ) {
      delete window.__ConverterIndicatorsService[String(this.id)];
    }
    super._dispose();
  }
  public static createInstance(
    id: string | number
  ): ConverterIndicatorsService {
    if (!window.__ConverterIndicatorsService) {
      window.__ConverterIndicatorsService = {};
    }
    if (!window.__ConverterIndicatorsService.hasOwnProperty(String(id))) {
      window.__ConverterIndicatorsService[String(id)] =
        new ConverterIndicatorsService(String(id));
    }
    return window.__ConverterIndicatorsService[String(id)];
  }
}
