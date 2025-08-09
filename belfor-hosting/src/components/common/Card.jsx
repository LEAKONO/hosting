export default function Card({ 
  children, 
  title, 
  footer,
  headerAction,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  footerClassName = '' 
}) {
  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      {(title || headerAction) && (
        <div className={`flex items-center justify-between p-4 border-b ${headerClassName}`}>
          <h3 className="text-lg font-semibold">{title}</h3>
          {headerAction && (
            <div>{headerAction}</div>
          )}
        </div>
      )}
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
      {footer && (
        <div className={`p-4 border-t ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  )
}