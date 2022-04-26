class NumberFormatter {
  static formatNumber(number) {
    if (!number) return '';
    return number.toLocaleString('ru-RU');
  }
}

export default NumberFormatter;
