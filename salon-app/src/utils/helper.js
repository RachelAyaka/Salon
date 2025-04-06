export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePhone = (phone) => {
  const regex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/
  return regex.test(phone)
}

export const getInitials = (name) => {
  if (!name) return ''

  const words = name.split(' ')
  let initials = ''

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]
  }

  return initials.toUpperCase()
}

export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  if (hours > 0 && mins > 0) {
    return `${hours}hr ${mins}min`
  } else if (hours > 0) {
    return `${hours}hr`
  } else {
    return `${mins}min`
  }
}
