export function fixDateTimeFormat(dateTimeStr: string): string {
  // Match pattern: "M/D/YYYY H/M/S" with slashes in time part
  const regex =
    /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2})\/(\d{1,2})\/(\d{1,2})$/
  const match = dateTimeStr.trim().match(regex)

  if (match) {
    const [, day, month, year, hour, minute, second] = match
    // Helper to pad numbers < 10 with a leading zero
    const pad = (num: string) => String(num).padStart(2, '0')

    // Reconstruct with padded values and colons in time
    return `${pad(day)}/${pad(month)}/${year} ${pad(hour)}:${pad(minute)}:${pad(second)}`
  }

  console.warn(
    'Input does not match expected malformed format: MM/DD/YYYY H/M/S',
  )
  return dateTimeStr
}
