import React from "react";
import AdaptiveView from "../../components/adaptive/AdaptiveView";
import AdaptiveText from "../../components/adaptive/AdaptiveText";

const FollowingOverlay = () => {
  return (
    <AdaptiveView classNames="flex-1 justify-center items-center">
      <AdaptiveText>Overlay reserved for Followed Accounts</AdaptiveText>
    </AdaptiveView>
  );
};

export default FollowingOverlay;
