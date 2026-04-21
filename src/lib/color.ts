export function darken(hex: string, amount = 0.2) {
  const c = hex.replace('#', '')
  const num = parseInt(c, 16)

  let r = (num >> 16) - Math.round(255 * amount)
  let g = ((num >> 8) & 0x00ff) - Math.round(255 * amount)
  let b = (num & 0x0000ff) - Math.round(255 * amount)

  r = Math.max(0, r)
  g = Math.max(0, g)
  b = Math.max(0, b)

  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`
}

export function brighten(hex: string, amount = 0.2) {
  const c = hex.replace('#', '')
  const num = parseInt(c, 16)

  let r = (num >> 16) + Math.round(255 * amount)
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * amount)
  let b = (num & 0x0000ff) + Math.round(255 * amount)

  r = Math.min(255, r)
  g = Math.min(255, g)
  b = Math.min(255, b)

  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`
}
