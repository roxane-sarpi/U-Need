function PageHeader({title, subtitle}){
  return(
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-ink tracking-tight">{title}</h1>
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}
          </p>
        </div>
      </div>
  )
}

export default PageHeader;