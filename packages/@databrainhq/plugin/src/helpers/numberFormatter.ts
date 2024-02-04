/* eslint-disable no-param-reassign */
import { adaptiveFormatter } from './adaptiveFormatter';
import { truncateText } from '@/utils';
import { NA_VALUE } from '@/consts';

/**
 * @name numberFormatter - it is used to convert the value in different formats
 * @param val - value that needs to be formatted
 * @param formatter - the formatter value that needs to be applied to the value
 * @returns - the formatted value
 */

const ms2Formatter = (val: any) => {
  const seconds = Math.floor(Number(val) / 1000);
  const remainingMilliseconds = Math.floor(Number(val) % 1000);
  const deciMiliSec = Number(val) - Math.floor(Number(val));
  const microSeconds = Math.floor(deciMiliSec * 1000);
  const deciMicro = deciMiliSec * 1000 - microSeconds;
  const nanoSeconds = Math.floor(deciMicro * 1000);
  let finalResult = '';
  if (seconds) finalResult += `${seconds}s `;
  else if (remainingMilliseconds) finalResult += `${remainingMilliseconds}ms `;
  else if (microSeconds) finalResult += `${microSeconds}µs`;
  else if (nanoSeconds) finalResult += `${nanoSeconds}ns`;
  return finalResult;
};

export const numberFormatter = (val: any, formatter: any) => {
  if (val == null) return NA_VALUE;
  val = truncateText(val, 30);
  const comaFormatter = new Intl.NumberFormat();
  const hasDecimalNums = val.toString().includes('.');
  switch (formatter) {
    case 'original':
      return val;
    case 'dollar': {
      const integerVal = parseInt(val, 10);
      return `$${integerVal.toLocaleString()}`;
    }
    case '$(adaptive)': {
      const adaptiveVal = adaptiveFormatter(val, false);
      return `$${adaptiveVal}`;
    }
    case '3s':
    case 'adaptive': {
      const value = adaptiveFormatter(val, true);
      return value;
    }
    case 'percent': {
      return `${val}%`;
    }
    case 'd': {
      const integerVal = parseInt(val, 10);
      return integerVal.toLocaleString();
    }
    case '1s': {
      if (val.toString().length > 3) {
        let num = val.toString().slice(0, 1);
        const num2 = Math.floor(Number(val));
        for (let i = 1; i < num2.toString().length; i += 1) {
          num += 0;
        }
        const value = adaptiveFormatter(num, false);
        return value;
      }
      const num2 = Math.floor(Number(val));
      return num2;
    }
    case '1f': {
      const num: any = Number(val).toFixed(1);
      const value = comaFormatter.format(num);
      if (val.toString().includes('.')) {
        return value;
      }
      return `${value}.${Array(2).join('0')}`;
    }
    case '2f': {
      const num: any = Number(val).toFixed(2);
      const value = comaFormatter.format(num);
      if (val.toString().includes('.')) {
        const arr = val.toString().split('.');
        if (arr[1].length > 1) {
          return value;
        }
        return `${value}${Array(2).join('0')}`;
      }
      return `${value}.${Array(3).join('0')}`;
    }
    case '3f': {
      const num: any = Number(val).toFixed(3);
      const value = comaFormatter.format(num);
      if (hasDecimalNums) {
        const decimalArr = val.toString().split('.');
        if (decimalArr[1].length > 2) {
          return value;
        }
        if (decimalArr[1].length === 2) {
          return `${value}${Array(2).join('0')}`;
        }
        return `${value}${Array(3).join('0')}`;
      }
      return `${value}.${Array(4).join('0')}`;
    }
    case '+': {
      return `+${comaFormatter.format(val)}`;
    }
    case '$': {
      const num: any = Number(val).toFixed(2);
      const value = comaFormatter.format(num);
      if (hasDecimalNums) {
        const decimalArr = val.toString().split('.');
        if (decimalArr[1].length > 1) {
          return `$${value}`;
        }
        return `$${value}${Array(2).join('0')}`;
      }
      return `$${value}.${Array(3).join('0')}`;
    }
    case '1%': {
      const num: any = Number(val) * 100;
      const num2: any = Number(num).toFixed(1);
      const value = comaFormatter.format(num2);
      if (num.toString().includes('.')) {
        return `${value}%`;
      }
      return `${value}.${Array(2).join('0')}%`;
    }
    case '2%': {
      const num: any = Number(val) * 100;
      const num2: any = Number(num).toFixed(2);
      const value = comaFormatter.format(num2);
      if (num.toString().includes('.')) {
        const decimalArr = val.toString().split('.');
        if (decimalArr[1].length > 1) {
          return `${value}%`;
        }
        return `${value}.${Array(2).join('0')}`;
      }
      return `${value}.${Array(3).join('0')}%`;
    }
    case '3%': {
      const num: any = val * 100;
      const num2: any = Number(num).toFixed(3);
      const value = comaFormatter.format(num2);
      if (num.toString().includes('.')) {
        const decimalArr = val.toString().split('.');
        if (decimalArr[1].length > 1) {
          return `${value}%`;
        }
        return `${value}.${Array(3).join('0')}`;
      }
      return `${value}.${Array(4).join('0')}%`;
    }
    case 'ms1': {
      const seconds = Math.floor(Number(val) / 1000);
      const remainingMilliseconds = Number(val) % 1000;
      return `${seconds}.${remainingMilliseconds.toString().slice(0, 1)}s`;
    }
    case 'ms2': {
      const ms2Value = ms2Formatter(val);
      return ms2Value;
    }
    case '4r': {
      return Math.floor(Math.round(Number(val)));
    }
    default:
      return val;
  }
};
