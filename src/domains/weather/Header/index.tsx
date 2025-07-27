import { FC } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

interface Props {
  update_time: string;
}

dayjs.extend(relativeTime);

const Header: FC<Props> = (props) => {
  const { update_time } = props;
  return (
    <header>
      <h1>Weather</h1>
      <span>{dayjs(update_time).fromNow()}</span>
    </header>
  );
};

export { Header };
