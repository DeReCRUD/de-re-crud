import { ILabel } from '../models/schema';

export default function parseLabel(
  labelJson?: string | { short?: string; medium?: string; long?: string },
): ILabel {
  let label: ILabel;

  if (!labelJson) {
    labelJson = '';
  }

  if (typeof labelJson === 'string') {
    label = {
      long: labelJson,
      medium: labelJson,
      short: labelJson,
    };
  } else {
    label = {
      long: labelJson.long || labelJson.medium || labelJson.short || '',
      medium: labelJson.medium || labelJson.short || labelJson.long || '',
      short: labelJson.short || labelJson.medium || labelJson.long || '',
    };
  }

  return label;
}
