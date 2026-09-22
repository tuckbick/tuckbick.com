import formatDate from "./formatDate";

export type Duration = {
    start: string,
    end?: string | null
}

export default function formatDuration(duration: Duration) {
    const start = formatDate(duration.start)
    const end = duration.end ? formatDate(duration.end) : 'Present';

    return `${start} - ${end}`
}