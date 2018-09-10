const getPageCount = result =>
  !result || !result.limit ? 1 : Math.ceil(result.total / result.limit);

const getPageNum = result => Math.floor(result.skip / result.limit) + 1;

const getStartIndex = result => result.skip;

const getNextPageIndex = result => {
  const nextIndex = result.skip - (result.skip % result.limit) + result.limit;
  return Math.min(nextIndex, result.total - 1);
};

const getPrevPageIndex = result => {
  const prevIndex = result.skip - (result.skip % result.limit) - result.limit;
  return Math.max(prevIndex, 0);
};

export {
  getPageNum,
  getPageCount,
  getStartIndex,
  getNextPageIndex,
  getPrevPageIndex
};
