
const randomColor = (colors, data)=>{
    if (data === undefined) return colors[0]
    return Array(Math.ceil(data.length / 2)).fill(colors).flat();
}

const sliceArray =(data, number) =>{
    if (data === undefined) return []
    return data.slice(0, number)
}

export { randomColor, sliceArray}