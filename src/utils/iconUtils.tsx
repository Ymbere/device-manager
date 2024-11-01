import { LinuxIcon, WindowsIcon, MacIcon } from "../assets/svgs";
import { DEVICE_TYPES } from "../consts";

export const getIconBasedOnSystem = (system: string) => {
  const keyValues: Array<[string, React.ReactElement]> = [
    [DEVICE_TYPES.LINUX, <LinuxIcon width="14px" height="16px" />],
    [DEVICE_TYPES.WINDOWS, <WindowsIcon width="14px" height="16px" />],
    [DEVICE_TYPES.MAC, <MacIcon width="14px" height="19px" />],
  ];
  const systemIcon = new Map(keyValues);
  return systemIcon.get(system);
};
