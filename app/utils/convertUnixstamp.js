export const unixstampConverter = (stamp) => {
  const months = ['янв.', 'февр.', 'марта', 'апр', 'мая', 'июня', 'июля', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.'];
  const date = new Date(stamp);
  /* const month = months[date.getMonth()];
  const day = date.getDate(); */
  const hours = date.getHours();
  const min = `0${date.getMinutes()}`;
  return `${hours}:${min.substr(-2)}`;
};
