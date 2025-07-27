import { FC } from "react";
import { getCloudType, mergeForecastWithShortTermForecast } from "../utils";
import { WindDirection } from "../component/WindDirection";
import dayjs from "dayjs";

interface Props {
  forecast_list: ReturnType<typeof mergeForecastWithShortTermForecast>;
}

const ForecastSection: FC<Props> = (props) => {
  const { forecast_list } = props;

  // forecast_list가 undefined이거나 배열이 아닌 경우 빈 배열로 처리
  if (!forecast_list || !Array.isArray(forecast_list)) {
    return <section>예보 데이터를 불러오는 중...</section>;
  }

  return (
    <section>
      <ol>
        <li>
          <span>일시</span>
          <span>기온</span>
          <span>강수량</span>
          <span>습도</span>
          <span>풍향</span>
          <span>풍속</span>
        </li>
      </ol>
      <ol>
        {forecast_list.map((item, index) => {
          const date = item.TMP.fcstDate;
          const time = item.TMP.fcstTime;
          const dateTime = dayjs(`${date} ${time}`);
          const diff = formatDiffDays(dateTime);
          return (
            <li key={`forecast-${dateTime}`}>
              <span>{diff}</span>
              <span>{getCloudType(item.SKY.fcstValue)}</span>
              <span>{item.TMP.fcstValue}℃</span>
              <span>{item.POP.fcstValue}%</span>
              <span>{item.PCP.fcstValue}mm</span>
              <span>{item.REH.fcstValue}%</span>
              <span>{item.WSD.fcstValue}</span>
              <WindDirection direction={parseInt(item.VEC?.fcstValue ?? "0")} />
              <span>{item.UUU.fcstValue}m/s</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export { ForecastSection };

function formatDiffDays(dateTime: dayjs.Dayjs) {
  const diff = dateTime.diff(dayjs(), "day");
  if (diff === 0) {
    return "오늘";
  } else if (diff === 1) {
    return "내일";
  } else if (diff === 2) {
    return "모레";
  } else {
    return `${diff}일 후`;
  }
}
