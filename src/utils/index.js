/**
 * Created by lenovo on 2018/7/2.
 */
// 判断参数是否是其中之一
export function isInList (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
