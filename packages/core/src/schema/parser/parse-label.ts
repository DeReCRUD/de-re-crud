import { ILabel } from '..';

export default function parseLabel(
  label?: string | { short?: string; medium?: string; long?: string },
): ILabel {
  let result: ILabel;

  if (!label) {
    label = '';
  }

  if (typeof label === 'string') {
    result = {
      long: label,
      medium: label,
      short: label,
    };
  } else {
    result = {
      long: label.long || label.medium || label.short || '',
      medium: label.medium || label.short || label.long || '',
      short: label.short || label.medium || label.long || '',
    };
  }

  return result;
}
