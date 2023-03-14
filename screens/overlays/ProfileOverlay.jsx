import React from "react";
import AdaptiveView from "../../components/adaptive/AdaptiveView";
import AdaptiveText from "../../components/adaptive/AdaptiveText";

const ProfileOverlay = () => {
  return (
    <AdaptiveView classNames="flex-1 justify-center items-center">
      <AdaptiveText>Overlay reserved for user profile</AdaptiveText>
    </AdaptiveView>
  );
};

export default ProfileOverlay;
