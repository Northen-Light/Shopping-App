export function queryItemsBasedOnText(text, items) {
  if (!text || !text.length) return [];

  return items.filter(item =>
    item.name.toLowerCase().includes(text.toLowerCase()),
  );
}
