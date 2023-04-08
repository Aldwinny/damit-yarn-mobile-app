export function numberCompactor(number) {
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1) + "T";
  }
}

export function formatCurrency(number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(number);
}

export function starRepresentation(actual) {
  let vector = Math.floor(actual);
  let representation = actual;

  if (representation >= vector - 0.25 && representation <= vector + 0.25) {
    return vector;
  } else if (representation > vector + 0.25 && representation < vector + 0.75) {
    return vector + 0.5;
  } else if (representation > vector + 0.75) {
    return vector + 1;
  } else if (representation < vector - 0.25 && representation < vector - 0.75) {
    return vector - 0.5;
  } else {
    return vector - 1;
  }
}

export function toCamelCase(string) {
  let array = string.split(" ");
  array = array.map((str) => str.charAt(0).toUpperCase() + str.slice(1));

  return array.join(" ");
}
