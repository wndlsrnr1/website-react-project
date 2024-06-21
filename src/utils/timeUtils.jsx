export const parseDate = (date) => new Date(date).toLocaleDateString('ko-KR', {
  year: 'numeric', month: 'numeric', day: 'numeric'
});