export default function getWeight(totalLength, totalWidth, totalHeight) {
  //  this gives weight in kg
  const volumetricWeight = (totalLength + totalWidth + totalHeight) / 5000;
  return volumetricWeight;
}
