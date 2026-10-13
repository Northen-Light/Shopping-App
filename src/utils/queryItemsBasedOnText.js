export const queryItemsBasedOnText = (text, items, controller) => {
  if (!text) return Promise.resolve([]);

  return new Promise((res, rej) => {
    const signal = controller.signal;

    const result = items.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );

    const delay = Math.random(0) * 5 * 1000;

    const timer = setTimeout(() => res(result), delay);

    const handleAbort = () => {
      clearTimeout(timer);
      rej(new Error('aborted'));
    };

    signal.addEventListener('abort', handleAbort, { once: true });
  });
};
