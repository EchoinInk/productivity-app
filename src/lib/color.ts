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
export function brightenAndSaturate(hex: string, brightenAmt = 0.18, satAmt = 0.25) {
  const hsl = hexToHSL(hex)

  hsl.l = Math.min(1, hsl.l + brightenAmt)   // brighter
  hsl.s = Math.min(1, hsl.s + satAmt)        // more saturated

  return HSLToHex(hsl)
}

export function hexToHSL(hex: string) {
  hex = hex.replace('#', '')

  let r = parseInt(hex.substring(0, 2), 16) / 255
  let g = parseInt(hex.substring(2, 4), 16) / 255
  let b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return { h, s, l }
}

export function HSLToHex({ h, s, l }: { h: number; s: number; l: number }) {
  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

