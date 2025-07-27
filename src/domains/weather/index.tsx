import { WeatherAdapterInterface } from "@/api/weather/types";
import { FC } from "react";
import { mergeForecastWithShortTermForecast } from "./utils";
import dayjs from "dayjs";
import { LiveSection } from "./LiveSection";
import { ForecastSection } from "./ForecastSection";
import { Header } from "./Header";

interface Props {
  live: Awaited<ReturnType<WeatherAdapterInterface["live"]>>;
  today_temperature: Awaited<
    ReturnType<WeatherAdapterInterface["todayTemperature"]>
  >;
  merged_forcast: ReturnType<typeof mergeForecastWithShortTermForecast>;
  update_time: string;
}

const WeatherMain: FC<Props> = (props) => {
  const { live, today_temperature, merged_forcast, update_time } = props;

  return (
    <main>
      <Header update_time={update_time} />
      <LiveSection live={live} today_temperature={today_temperature} />
      <ForecastSection forecast_list={merged_forcast} />
    </main>
  );
};

export { WeatherMain };
