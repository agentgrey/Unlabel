export default function IngredientCard({ ingredient }) {
  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body p-4">
        <p className="font-semibold">{ingredient?.name ?? 'ingredient'}</p>
        <p className="text-sm text-base-content/50">
          {ingredient?.summary ?? 'analysis coming soon'}
        </p>
      </div>
    </div>
  )
}