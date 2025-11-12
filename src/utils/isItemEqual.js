export const isItemEqual = (a, b) => {
  return (
    a.id === b.id &&
    a.type === b.type &&
    a.size === b.size)
}
