// Following groupBy helper functions are very common in libraries
// such as "lodash" and "underscore", but for the scope of this project
// currently there was no need to include those libraries just for a
// simple functions

export const groupBy = <T>(
  array: any[],
  field: string,
  multi = false,
): { [index: string]: T & T[] } => {
  return array.reduce(
    (dict: { [x: string]: any }, item: { [x: string]: any }) => {
      const key = item[field];
      if (multi) {
        // For handling multiple objects against provided field
        if (!dict[key]) {
          dict[key] = [];
        }
        dict[key].push(item);
      } else {
        // If object against field does not repeat
        dict[key] = item;
      }
      return dict;
    },
    {},
  );
};

export const groupByDate = <T>(
  array: any[],
  field: string,
  groupKey: 'year' | 'month' | 'dateOfMonth' | 'dayOfWeek' = 'month',
): { [index: string]: T } => {
  return array.reduce(
    (dict: any[][], item: { [x: string]: string | number | Date }) => {
      const date = new Date(item[field]);
      let key;

      switch (groupKey) {
        case 'year':
          key = date.getFullYear();
          break;
        case 'month':
          // by default January is 0, February is 1, and so on.
          // now after adding 1, Jaunary is 1 and so on.
          key = date.getMonth() + 1;
          break;
        case 'dateOfMonth':
          key = date.getDate();
          break;
        case 'dayOfWeek':
          // Sunday is 0, Monday is 1, and so on.
          // now after adding 1, Sunday is 1 and so on.
          key = date.getDay() + 1;
          break;
      }

      if (!dict[key]) {
        dict[key] = [];
      }
      dict[key].push(item);
      return dict;
    },
    {},
  );
};
