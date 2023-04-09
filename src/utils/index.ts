import { runQuery } from './runQuery';
import { runUpdateItemsTransaction } from './runUpdateItemsTransaction';

export const getFormattedCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const mm = currentDate.getMonth() + 1;
  const dd = currentDate.getDate();

  const month = mm < 10 ? `0${mm}` : mm;
  const day = dd < 10 ? `0${dd}` : dd;

  const formattedCurrentDate = `${year}-${month}-${day}`;

  return formattedCurrentDate;
};

export {
  runQuery,
  runUpdateItemsTransaction,
};

