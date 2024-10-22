const container = document.querySelector('.container')

const rain = () => {
  let j = 0
  while (j <= 80){
    let gout = document.createElement('i')
    container?.appendChild(gout)
    j++;
  }
}

rain()