/**
 *  @name adaptiveFormatter - helps in formatting the data in adaptive format (eg. k, M, B etc)
 *  @params - takes the value that needs to be formatted and a flag that tells if the value is in decimals or not
 *  @returns - value in adaptive format
 */

export const adaptiveFormatter = (val: any, isDecimal: boolean) => {
  let value = '';
  if (isDecimal) {
    switch (parseInt(val, 10).toString().length) {
      case 1:
      case 2:
      case 3:
        value = val;
        break;
      case 4:
        value = `${val.toString().slice(0, 1)}.${val.toString().slice(1, 3)}k`;
        break;
      case 5:
        value = `${val.toString().slice(0, 2)}.${val.toString().slice(2, 4)}k`;
        break;
      case 6:
        value = `${val.toString().slice(0, 3)}.${val.toString().slice(3, 5)}k`;
        break;
      case 7:
        value = `${val.toString().slice(0, 1)}.${val.toString().slice(1, 3)}M`;
        break;
      case 8:
        value = `${val.toString().slice(0, 2)}.${val.toString().slice(2, 4)}M`;
        break;
      case 9:
        value = `${val.toString().slice(0, 3)}.${val.toString().slice(3, 5)}M`;
        break;
      case 10:
        value = `${val.toString().slice(0, 1)}.${val.toString().slice(1, 3)}B`;
        break;
      case 11:
        value = `${val.toString().slice(0, 2)}.${val.toString().slice(2, 4)}B`;
        break;
      case 12:
        value = `${val.toString().slice(0, 1)}.${val.toString().slice(1, 3)}T`;
        break;
      case 13:
        value = `${val.toString().slice(0, 2)}.${val.toString().slice(2, 4)}T`;
        break;
      case 15:
        value = `${val.toString().slice(0, 3)}.${val.toString().slice(3, 5)}T`;
        break;
      case 16:
        value = `${val.toString().slice(0, 1)}.${val.toString().slice(1, 3)}P`;
        break;
      case 17:
        value = `${val.toString().slice(0, 2)}.${val.toString().slice(2, 4)}P`;
        break;
      default:
        break;
    }
  } else {
    switch (parseInt(val, 10).toString().length) {
      case 1:
      case 2:
      case 3:
        value = val;
        break;
      case 4:
        value = `${val.toString().slice(0, 1)}k`;
        break;
      case 5:
        value = `${val.toString().slice(0, 2)}k`;
        break;
      case 6:
        value = `${val.toString().slice(0, 3)}k`;
        break;
      case 7:
        value = `${val.toString().slice(0, 1)}M`;
        break;
      case 8:
        value = `${val.toString().slice(0, 2)}M`;
        break;
      case 9:
        value = `${val.toString().slice(0, 3)}M`;
        break;
      case 10:
        value = `${val.toString().slice(0, 1)}B`;
        break;
      case 11:
        value = `${val.toString().slice(0, 2)}B`;
        break;
      case 12:
        value = `${val.toString().slice(0, 1)}T`;
        break;
      case 13:
        value = `${val.toString().slice(0, 2)}T`;
        break;
      case 15:
        value = `${val.toString().slice(0, 3)}T`;
        break;
      case 16:
        value = `${val.toString().slice(0, 1)}P`;
        break;
      case 17:
        value = `${val.toString().slice(0, 2)}P`;
        break;
      default:
        break;
    }
  }
  return value;
};
