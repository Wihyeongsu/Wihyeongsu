export const DataFormats = ["1D", "3D"] as const;
export type DataFormat = (typeof DataFormats)[number];
