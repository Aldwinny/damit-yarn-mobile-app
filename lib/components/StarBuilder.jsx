import { starRepresentation } from "../utils/formatter";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const StarBuilder = ({ color = "#EAD72C", size = 20, stars = 0 }) => {
  let rep = starRepresentation(stars);
  let starComponents = [];

  for (let i = 0; i < 5; i++) {
    starComponents.push(
      rep - 1 >= 0 ? (
        <FontAwesome
          key={i}
          color={color}
          name="star"
          size={size}
          style={{
            marginHorizontal: 1,
          }}
        />
      ) : rep % 1 > 0 ? (
        <FontAwesome
          key={i}
          color={color}
          name="star-half-full"
          size={size}
          style={{
            marginHorizontal: 1,
          }}
        />
      ) : (
        <FontAwesome
          key={i}
          color={color}
          name="star-o"
          size={size}
          style={{
            marginHorizontal: 1,
          }}
        />
      )
    );
    if (rep - 1 >= 0) {
      rep--;
    } else if (rep % 1 > 0) {
      rep -= 0.5;
    }
  }

  return starComponents;
};

export default StarBuilder;
