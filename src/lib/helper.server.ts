export function withTime(data: object) {
  return {
    ...data,
    fetchTime: new Date().toISOString(),
  };
}
