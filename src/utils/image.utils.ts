export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous' // to handle CORS issues
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
  })
}

export const downloadImage = (dataURL: string, filename: string) => {
  const link = document.createElement('a')
  link.href = dataURL
  link.download = filename
  link.click()
}
