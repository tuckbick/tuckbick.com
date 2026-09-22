export default (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).replace(',', '')
}