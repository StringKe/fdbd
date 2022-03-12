import React from 'react'

export default function useReadFile(
    onSelect: (file: File) => void,
    fileType: string = 'text/plain,text/dbml,.txt,.dbml'
) {
    return React.useCallback(() => {
        const tempElement = document.createElement('input')
        tempElement.setAttribute('type', 'file')
        tempElement.setAttribute('accept', fileType)
        tempElement.setAttribute('style', 'width:0;height:0,opacity:0;display:none')
        tempElement.addEventListener('change', () => {
            if (tempElement.files) {
                const files = tempElement.files
                if (files.length) {
                    onSelect(files[0])
                }
            }
            setTimeout(() => {
                document.body.removeChild(tempElement)
            }, 50)
        })
        document.body.appendChild(tempElement)
        setTimeout(() => {
            tempElement.click()
        }, 5)
    }, [fileType, onSelect])
}
