export type DataFormat = "1D" | "2D";

export type FormatMapping = {
  [key in DataFormat]: {
    label: string;
    description: string;
    convert: (shape: number[]) => number[];
  };
};

export const formatInfo: FormatMapping = {
  "1D": {
    label: "1D",
    description: "N (Flatten)",
    convert: (shape: number[]) => {
      // [H, W, C] -> [N]
      return [shape[0] * shape[1] * shape[2]];
    },
  },
  "2D": {
    label: "2D",
    description: "H × W × C",
    convert: (shape: number[]) => {
      if (shape.length === 1) {
        // [N] -> [H, W, C]
        const size = Math.ceil(Math.sqrt(shape[0]));
        return [size, size, 1];
      }
      return shape;
    },
  },
};
