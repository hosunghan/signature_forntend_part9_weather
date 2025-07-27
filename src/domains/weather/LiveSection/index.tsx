import { WeatherAdapterInterface } from "@/api/weather/types";
import { FC } from "react";
import { WindDirection } from "../component/WindDirection";
import { getRainyType } from "../utils";

interface Props {
  live: Awaited<ReturnType<WeatherAdapterInterface["live"]>>;
  today_temperature: Awaited<
    ReturnType<WeatherAdapterInterface["todayTemperature"]>
  >;
}

const LiveSection: FC<Props> = (props) => {
  const { live, today_temperature } = props;
  return (
    <section>
      <div>
        <div>
          {/* 현재기온, 강수여부  */}
          <strong>{live.T1H?.obsrValue}℃</strong>
          <strong>{getRainyType(live.PTY?.obsrValue)}</strong>
        </div>
        <div>
          {/* 최저, 최고 기온 */}
          <dl>
            <dt>최저</dt>
            <dd>
              <strong>{today_temperature.min}℃</strong>
            </dd>
            <dt>최고</dt>
            <dd>
              <strong>{today_temperature.max}℃</strong>
            </dd>
          </dl>
        </div>
        <span>(오전 6시, 오후 3시)</span>
      </div>
      <div>
        {/* 강수량, 습도, 풍향, 풍속  */}
        <dl>
          <dt>강수량</dt>
          <dd>{live.RN1?.obsrValue}mm</dd>
          <dt>습도</dt>
          <dd>{live.REH?.obsrValue}%</dd>
          <dt>풍향</dt>
          <dd>
            {live.VEC?.obsrValue}
            <WindDirection direction={parseInt(live.VEC?.obsrValue ?? "0")} />
          </dd>
          <dt>풍속</dt>
          <dd>{live.WSD?.obsrValue}m/s</dd>
        </dl>
      </div>
    </section>
  );
};

export { LiveSection };
