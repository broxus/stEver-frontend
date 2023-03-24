import download from 'downloadjs'

export function useDownload(val: string, name: string, type: string = 'text/plain'): () => void {
    return () => {
        download(val, name, type)
    }
}
