import { useRef, useState, useEffect } from 'react'

export default function UploadZone({ onImageSelected, externalClear }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState(null)

  // parent can force-clear the upload zone
  useEffect(() => {
    if (externalClear) {
      setPreview(null)
      setFileName(null)
      if (inputRef.current) inputRef.current.value = ''
    }
  }, [externalClear])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('drop an image file bestie 🫠')
      return
    }

    setFileName(file.name)
    setPreview(URL.createObjectURL(file))
    onImageSelected(file)
  }

  const handleClear = () => {
    setPreview(null)
    setFileName(null)
    onImageSelected(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-3">

      {!preview && (
        <div
          onClick={() => inputRef.current.click()}
          className="border-2 border-dashed border-base-300 rounded-2xl p-12 text-center cursor-pointer hover:border-primary hover:bg-base-200 active:scale-[0.99] transition-all duration-200 group"
        >
          <div className="flex flex-col items-center gap-3">
            <div>
              <p className="font-medium text-base-content">
                click to upload an image
              </p>
              <p className="text-sm text-base-content/40 mt-1">
                jpg, png, webp — keep it clear for best results
              </p>
            </div>
            <span className="btn btn-primary btn-sm mt-1">
              browse files
            </span>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {preview && (
        <div className="flex flex-col gap-3">
          <div className="relative rounded-2xl overflow-hidden border border-base-200">
            <img
              src={preview}
              alt="ingredient list"
              className="w-full max-h-72 object-contain bg-base-200"
            />
            <button
              onClick={handleClear}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-base-100/90 text-base-content/60 flex items-center justify-center text-xs hover:bg-error hover:text-white active:scale-90 transition-all duration-150 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-base-content/40 truncate">
              {fileName}
            </p>
            <button
              onClick={handleClear}
              className="text-xs text-base-content/30 hover:text-error underline underline-offset-2 cursor-pointer transition-colors duration-150"
            >
              remove
            </button>
          </div>
        </div>
      )}

    </div>
  )
}