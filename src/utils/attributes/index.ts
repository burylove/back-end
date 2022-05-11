const getAttributesInt = (min,max)=>{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

const Common_Attributes_random =  () => {
  const random = Number(getAttributesInt(1,10))
  // un normalized
 return random
}
const Uncommon_Attributes_random =  () => {
  const random = Number(getAttributesInt(8,18))
  // un normalized
  return random
}

const Rare_Attributes_random =  () => {
  const random = Number(getAttributesInt(15,35))
  // un normalized
  return random
}

const Epic_Attributes_random =  () => {
  const random = Number(getAttributesInt(28,63))
  // un normalized
  return random
}

const Legendary_Attributes_random =  () => {
  const random = Number(getAttributesInt(50,112))
  // un normalized
  return random
}


export {
  Common_Attributes_random,
  Uncommon_Attributes_random,
  Rare_Attributes_random,
  Epic_Attributes_random,
  Legendary_Attributes_random
}
