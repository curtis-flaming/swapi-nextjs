export const getSwapUrlParamString = (url: string) => {
  const urlParam = new URLSearchParams(url);
  let urlArray: string[] = [];
  for (let [key] of urlParam.entries()) {
    urlArray = String(key)
      .split("/")
      .filter((e) => !!e);
  }
  // TODO error handle??
  return `/${urlArray[urlArray.length - 2]}/${urlArray[urlArray.length - 1]}`;
};
