/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment'

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem('deviceId')
  if (!deviceId) {
    deviceId = generateUUID()
    localStorage.setItem('deviceId', deviceId)
  }
  return deviceId
}

export const generateRandomOrderCode = (length: any) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    result += characters.charAt(randomIndex)
  }
  return result
}

export const formatNumber = (number: number) => {
  // Handle negative numbers
  const isNegative = number < 0
  const absNumber = Math.abs(number)

  // Define extended SI prefixes
  const prefixes = ['', 'K', 'M', 'B', 'T', 'Q', 'Qi', 'Sx', 'Sp', 'Oc', 'N']
  // '' = no suffix, K = Thousand, M = Million, B = Billion, T = Trillion
  // Q = Quadrillion, Qi = Quintillion, Sx = Sextillion, Sp = Septillion, Oc = Octillion, N = Nonillion

  let formattedNumber: string

  if (absNumber < 100000000) {
    // For numbers below 100,000,000, format normally with two decimal places
    formattedNumber = absNumber.toFixed(2)
  } else {
    // For numbers 100,000,000 and above, use SI notation
    const index = Math.floor(Math.log10(absNumber) / 3)
    const suffix = prefixes[index] || '' // Get the appropriate suffix from extended prefixes
    const divisor = Math.pow(1000, index) // Calculate the divisor
    formattedNumber = (absNumber / divisor).toFixed(1) + suffix // Format the number with suffix
  }

  const displayNumber = `$${formattedNumber}` // Add a single dollar sign

  return isNegative ? `-${displayNumber}` : displayNumber // Restore negative sign if needed
}
export function convertToVietnamDateTime(utcDateTime: any) {
  return moment.utc(utcDateTime).local().format('HH:mm:ss DD-MM-YYYY ')
}

export const formatTime = (time: number) => {
  if (time <= 0) return '00:00:00'

  const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((time / (1000 * 60)) % 60)
  const seconds = Math.floor((time / 1000) % 60)

  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`
}

export function formatCurrency(amount: any) {
  return (
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
      .format(amount)
      .replace(/\$/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '$'
  )
}
