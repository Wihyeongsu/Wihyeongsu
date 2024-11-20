import { useState } from "react";

export const useTabs = (initialTab: number, allTabs: content[]) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex,
  };
};

interface content {
  tab: string;
  content: string;
}
