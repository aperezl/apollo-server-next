
interface CardProps {
  photo?: string
  title?: string
  subtitle?: string
  properties?: number
}

export const Card = ({
  photo = './beach-work.jpg',
  title = 'Toronto',
  subtitle = '$120 / night average',
  properties = 76,
}: CardProps) => {
  return (
    <div className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden">
        <img className="h-32 w-32 flex-shrink-0" src={photo} alt="photo" />
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
          <div className="mt-4">
            <a href="#" className="text-brand hover:text-brand-light font-semibold text-sm">
              Explore {properties} properties
            </a>
          </div>

        </div>
    </div>
  )
}
