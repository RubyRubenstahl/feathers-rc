import {
  getPageCount,
  getPageNum,
  getPrevPageIndex,
  getStartIndex,
  getNextPageIndex
} from "./pagination.js";

describe("getPageCount", () => {
  test("Returns 5 pages when 10 results are returned with a limit of 2", () => {
    expect(getPageCount({ total: 10, limit: 2 })).toBe(5);
  });

  test("Returns one page when 0 results are returned with a limit of 0", () => {
    expect(getPageCount({ total: 0, limit: 0 })).toBe(1);
  });

  test("Returns 6 pages when 10 results are returned with a limit of 11", () => {
    expect(getPageCount({ total: 11, limit: 10 })).toBe(2);
  });

  test("Returns 1 pages when nothing is passed", () => {
    expect(getPageCount()).toBe(1);
  });
});

describe("getStartIndex", () => {
  test("Returns the correct start index", () => {
    expect(getStartIndex({ skip: 5 })).toBe(5);
  });

  test("Returns the null withn nothing is passed", () => {
    expect(getStartIndex()).toBe(null);
  });
});

describe("getPageNum", () => {
  test("Returns 1 when nothing is passed", () => {
    expect(getPageNum()).toBe(1);
  });
  test("Returns 1 when our skip is 0", () => {
    expect(getPageNum({ skip: 0, total: 10, limit: 2 })).toBe(1);
  });

  test("Calculate the correct page when skip is a mltiple of limit", () => {
    expect(getPageNum({ skip: 4, total: 10, limit: 2 })).toBe(3);
  });

  test("Calculates the nearest page when skip is a not mltiple of limit", () => {
    expect(getPageNum({ skip: 5, total: 10, limit: 2 })).toBe(3);
  });
});
