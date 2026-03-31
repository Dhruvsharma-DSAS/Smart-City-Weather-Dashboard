export function getWearSuggestions(temp, weatherCondition) {
  const suggestions = [];
  const condition = weatherCondition.toLowerCase();

  if (temp < 15) suggestions.push("Wear a jacket ");
  if (temp >= 15 && temp <= 30) suggestions.push("Normal clothes are fine ");
  if (temp > 30) suggestions.push("Wear light clothes ");
  if (condition.includes("rain")) suggestions.push("Carry an umbrella ");
  if (condition.includes("cloud")) suggestions.push("Might get cloudy ");
  if (temp < 5) suggestions.push("Wear gloves and scarf ");
  if (temp > 35) suggestions.push("Stay hydrated ");

  return suggestions;
}
