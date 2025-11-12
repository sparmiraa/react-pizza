export const calculateTotlaPrice = (items) => {
  return items.reduce((acc, item) => acc + item.price * item.count, 0);
}