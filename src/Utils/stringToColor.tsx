const colorCache: Record<string, string> = {};

const stringToColor = (str: string) => {
  if (colorCache[str]) {
    return colorCache[str];
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = `hsl(${hash % 360}, 60%, 60%)`;

  colorCache[str] = color;

  return color;
};

export default stringToColor;