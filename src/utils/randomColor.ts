export const generateRandomColor = (): string => {
  const randomChannel = () => Math.floor(128 + Math.random() * 127); // 128 ~ 255 사이의 값 생성
  const r = randomChannel();
  const g = randomChannel();
  const b = randomChannel();
  return `rgb(${r}, ${g}, ${b})`;
};
