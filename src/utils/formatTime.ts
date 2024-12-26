export const formatTime = (seconds: number) => {
	const withZeroPrefix = (v: number) => `${v < 10 ? `0${v}` : v}`

	const anHourToSeconds = 3600
	const hours = withZeroPrefix(Math.floor(seconds / anHourToSeconds))
	seconds = seconds % anHourToSeconds
	const minutes = withZeroPrefix(Math.floor(seconds / 60))
	seconds = Math.floor(seconds % 60)

	if (hours == '00') {
		return `${minutes}:${withZeroPrefix(seconds)}`
	}

	return `${hours}:${minutes}:${withZeroPrefix(seconds)}`
}
