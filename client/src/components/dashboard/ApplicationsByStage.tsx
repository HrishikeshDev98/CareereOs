const ApplicationsByStage = ({ byStage }: { byStage?: Record<string, number> }) => {
  return (
    <>
      <h3>Application by Stage</h3>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {byStage &&
          Object.entries(byStage).map(([key, value]) => (
            <div
              key={key}
              className="border-gray-200 bg-white px-3 py-2 shadow-sm border-l-3 border-gray-900 pl-3 py-1"
            >
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {key.replaceAll('_', ' ')}
              </div>
              <div className="text-xl font-bold text-gray-900 mt-0.5">{String(value)}</div>
            </div>
          ))}
      </div>
    </>
  )
}

export default ApplicationsByStage
