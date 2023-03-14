import React from "react";
import AdaptiveView from "../../components/adaptive/AdaptiveView";
import AdaptiveText from "../../components/adaptive/AdaptiveText";

const TrendingOverlay = () => {
  return (
    <AdaptiveView classNames="flex-1 justify-center items-center">
      <AdaptiveText>Overlay reserved for trending stuff</AdaptiveText>
    </AdaptiveView>
  );
};

export default TrendingOverlay;
