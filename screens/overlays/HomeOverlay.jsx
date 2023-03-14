import React from "react";
import AdaptiveView from "../../components/adaptive/AdaptiveView";
import AdaptiveText from "../../components/adaptive/AdaptiveText";

const HomeOverlay = () => {
  return (
    <AdaptiveView classNames="flex-1 justify-center items-center">
      <AdaptiveText>Hello, Home</AdaptiveText>
    </AdaptiveView>
  );
};

export default HomeOverlay;
