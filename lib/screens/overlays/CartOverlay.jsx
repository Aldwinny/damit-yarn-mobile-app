import React from "react";
import AdaptiveView from "../../components/adaptive/AdaptiveView";
import AdaptiveText from "../../components/adaptive/AdaptiveText";

const CartOverlay = () => {
  return (
    <AdaptiveView classNames="flex-1 justify-center items-center">
      <AdaptiveText>Screen reserved for User cart</AdaptiveText>
    </AdaptiveView>
  );
};

export default CartOverlay;
