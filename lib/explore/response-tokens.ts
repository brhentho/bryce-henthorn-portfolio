export type ResponseCitation = { index: number; title: string; url?: string }
export type ResponseToken = { value: string; citation?: ResponseCitation; plain: boolean }

export function responseTokens(text: string, citations: readonly ResponseCitation[]): ResponseToken[] {
  return text.split(/(\s+|\[\d+\])/).filter(Boolean).map(value => {
    const marker = value.match(/^\[(\d+)\]$/)
    return {
      value,
      citation: marker ? citations.find(item => item.index === Number(marker[1])) : undefined,
      plain: /^\s+$/.test(value) || !/[\p{L}\p{N}]/u.test(value),
    }
  })
}

export function sharedDigitPrefix(previous: string, current: string) {
  let length = 0
  while (length < current.length && previous[length] === current[length]) length++
  return length
}
