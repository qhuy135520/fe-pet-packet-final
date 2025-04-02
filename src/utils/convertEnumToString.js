export default function convertEnumToString(enumValue) {
  const words = enumValue.toLowerCase().split("_");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return capitalizedWords.join(" ");
}
