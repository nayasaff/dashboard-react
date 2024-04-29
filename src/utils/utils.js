
const randomColor = (colors, data)=>{
    return Array(Math.ceil(data.length / 2)).fill(colors).flat();
}

export { randomColor}