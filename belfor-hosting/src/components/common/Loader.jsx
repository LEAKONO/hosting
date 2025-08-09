const Loader = ({ 
  size = 'md',
  color = 'primary',
  className = '' 
}) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4'
  }

  const colors = {
    primary: 'border-t-primary border-r-primary border-b-primary/10 border-l-primary/10',
    white: 'border-t-white border-r-white border-b-white/10 border-l-white/10',
    gray: 'border-t-gray-400 border-r-gray-400 border-b-gray-400/10 border-l-gray-400/10'
  }

  return (
    <div className={`inline-block animate-spin rounded-full ${sizes[size]} ${colors[color]} ${className}`} />
  )
}

export default Loader