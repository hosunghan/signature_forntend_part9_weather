import { ComponentProps, FC } from "react";
import { WeatherMain } from "@/domains/weather";
import { GetStaticProps } from "next";
import { Weather, WeatherAdapter } from "@/api/weather";
import { mergeForecastWithShortTermForecast } from "@/domains/weather/utils";

interface Props extends ComponentProps<typeof WeatherMain> {}

export const getStaticProps: GetStaticProps = async () => {
  const weather_instance = new Weather(60, 126);
  const weather = new WeatherAdapter(weather_instance);

  const promise = [
    weather.live(),
    weather.todayTemperature(),
    weather.forecast(),
    weather.shortTermForecast(),
  ] as const;

  const [live, today_temperature, forecast, short_term_forecast] =
    await Promise.all(promise);

  const merged_forcast = mergeForecastWithShortTermForecast(
    forecast,
    short_term_forecast
  );

  // const live = await weather.live();
  // const forecast = await weather.forecast();
  // const today_temperature = await weather.todayTemperature();
  // const short_term_forecast = await weather.shortTermForecast();

  console.log(live, forecast, today_temperature, short_term_forecast);

  return {
    props: {
      live,
      today_temperature,
      merged_forcast,
    },
  };
};

const WeatherPage: FC<Props> = (props) => {
  return (
    <div>
      <WeatherMain {...props} />
    </div>
  );
};

export default WeatherPage;
