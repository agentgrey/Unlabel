export default function Spinner({ text = 'loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <span className="loading loading-spinner loading-md text-primary"></span>
      <p className="text-sm text-base-content/40">{text}</p>
    </div>
  )
}