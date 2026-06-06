import { useRef, useState, useEffect } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function UploadZone({ onImageSelected, externalClear }) {
  const inputRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const [fileName, setFileName] = useState(null)

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

  const handleClear = (e) => {
    e.stopPropagation()
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
          className={cn(
            'border-2 border-dashed border-border rounded-2xl p-12',
            'flex flex-col items-center gap-3 text-center cursor-pointer',
            'hover:border-primary hover:bg-primary/5',
            'active:scale-[0.99] transition-all duration-200 group'
          )}
        >
          <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
            <ImagePlus className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
          </div>
          <div>
            <p className="font-medium text-sm">click to upload an image</p>
            <p className="text-xs text-muted-foreground mt-1">
              jpg, png, webp — keep it clear for best results
            </p>
          </div>
          <Button variant="outline" size="sm" className="mt-1 pointer-events-none">
            browse files
          </Button>
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
          <div className="relative rounded-2xl overflow-hidden border border-border">
            <img
              src={preview}
              alt="ingredient list"
              className="w-full max-h-72 object-contain bg-muted"
            />
            <button
              onClick={handleClear}
              className="absolute top-3 right-3 w-7 h-7 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground hover:border-destructive active:scale-90 transition-all duration-150 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center justify-between px-1">
            <p className="text-xs text-muted-foreground truncate">{fileName}</p>
            <button
              onClick={handleClear}
              className="text-xs text-muted-foreground hover:text-destructive underline underline-offset-2 cursor-pointer transition-colors duration-150"
            >
              remove
            </button>
          </div>
        </div>
      )}
    </div>
  )
}