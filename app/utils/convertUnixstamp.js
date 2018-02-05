export const unixstampConverter = (stamp) => {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const date = new Date(stamp);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const min = `0${date.getMinutes()}`;
  return {
    day: `${day} ${month}`,
    hour: `${hours}:${min.substr(-2)}`
  };
};
