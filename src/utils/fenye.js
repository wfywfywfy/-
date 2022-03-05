export function changeQ(currentPage, pageSize) {
  const obj = {}
  obj.currentPage = (currentPage - 1) * pageSize
  obj.pageSize = pageSize
  return obj
}

export function changeH(currentPage, pageSize) {

}