import React from 'react'

export default function useDownload(
    content: string,
    filename: string,
    type: string = 'text/plain'
) {
    return React.useCallback(() => {
        const data = new Blob([content], { type: type })
        const csvURL = window.URL.createObjectURL(data)

        const tempElement = document.createElement('a')
        tempElement.href = csvURL
        tempElement.setAttribute('download', filename)
        tempElement.click()
    }, [content, filename, type])
}
