import { WeatherAdapterInterface } from "@/api/weather/types";
import { FC } from "react";
import { mergeForecastWithShortTermForecast } from "./utils";

interface Props {
  live: Awaited<ReturnType<WeatherAdapterInterface["live"]>>;
  today_temperature: Awaited<
    ReturnType<WeatherAdapterInterface["todayTemperature"]>
  >;
  forecast: Awaited<ReturnType<WeatherAdapterInterface["forecast"]>>;
  short_term_forecast: Awaited<
    ReturnType<WeatherAdapterInterface["shortTermForecast"]>
  >;
  merged_forcast: ReturnType<typeof mergeForecastWithShortTermForecast>;
}

const WeatherMain: FC<Props> = (props) => {
  const { live, today_temperature, merged_forcast } = props;

  return <div>WeatherMain</div>;
};

export { WeatherMain };
