import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function Tooltip({ 
  children, 
  content, 
  position = 'top',
  delay = 200,
  className = '' 
}) {
  const [visible, setVisible] = useState(false)
  const [coords, setCoords] = useState({})
  const triggerRef = useRef(null)
  let timeout

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  }

  const showTooltip = () => {
    timeout = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        setCoords({
          left: rect.left + window.scrollX,
          top: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height
        })
      }
      setVisible(true)
    }, delay)
  }

  const hideTooltip = () => {
    clearTimeout(timeout)
    setVisible(false)
  }

  useEffect(() => {
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <span 
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        className="inline-block"
      >
        {children}
      </span>

      {visible && createPortal(
        <div 
          className={`absolute z-50 px-3 py-2 text-sm bg-gray-800 text-white rounded-md shadow-lg ${positions[position]} ${className}`}
          style={{
            left: coords.left + (coords.width / 2),
            top: position.includes('top') ? coords.top : undefined,
            bottom: position.includes('bottom') ? window.innerHeight - coords.top - coords.height : undefined
          }}
        >
          {content}
          <div 
            className={`absolute w-3 h-3 bg-gray-800 transform rotate-45 ${position === 'top' ? 'bottom-0 left-1/2 -mb-1.5 -translate-x-1/2' : ''} ${position === 'bottom' ? 'top-0 left-1/2 -mt-1.5 -translate-x-1/2' : ''} ${position === 'left' ? 'right-0 top-1/2 -mr-1.5 -translate-y-1/2' : ''} ${position === 'right' ? 'left-0 top-1/2 -ml-1.5 -translate-y-1/2' : ''}`}
          />
        </div>,
        document.body
      )}
    </>
  )
}