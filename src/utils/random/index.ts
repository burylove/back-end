const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}

const Common_pet_random = async () => {
  const random = getRandomInt(0,100)
  // un normalized
  if (random > 96){
      return 'Uncommon'
  }else{
    return 'Common'
  }
}

const Uncommon_pet_random = async () => {
  const random = getRandomInt(0,100)
  // un normalized
  if (random > 97){
    return 'Rare'
  }else if (random > 25 && random < 98   ){
    return 'Uncommon'
  }else {
    return 'Common'
  }
}

const Rare_pet_random = async () => {
  const random = getRandomInt(0,100)
  // un normalized
  if (random > 97){
    return 'Epic'
  }else if (random > 25 && random < 98   ){
    return 'Rare'
  }else {
    return 'Uncommon'
  }


}

const Epic_pet_random = async () => {
  const random = getRandomInt(0,100)
  // un normalized
  if (random > 97){
    return 'Legendary'
  }else if (random > 29 && random < 98   ){
    return 'Epic'
  }else {
    return 'Rare'
  }
}

export {
  Common_pet_random,
  Uncommon_pet_random,
  Rare_pet_random,
  Epic_pet_random
}
