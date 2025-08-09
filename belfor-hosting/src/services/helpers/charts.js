// services/helpers/charts.js
export const formatChartData = (rawData, options = {}) => {
  const defaultOptions = {
    dateFormat: { month: 'short', day: 'numeric' },
    valueKey: 'value',
    labelKey: 'date'
  }
  
  const { dateFormat, valueKey, labelKey } = { ...defaultOptions, ...options }
  
  return rawData.map(item => ({
    label: new Date(item[labelKey]).toLocaleDateString('en-US', dateFormat),
    value: item[valueKey] || 0,
    rawDate: item[labelKey],
    ...item
  }))
}

export const generateBarChartConfig = (data, color) => {
  return {
    labels: data.map(item => item.label),
    datasets: [{
      label: 'Count',
      data: data.map(item => item.value),
      backgroundColor: color || 'rgba(0, 100, 0, 0.7)',
      borderColor: color || 'rgba(0, 100, 0, 1)',
      borderWidth: 1,
      borderRadius: 4
    }]
  }
}

export const generateLineChartConfig = (data, color) => {
  return {
    labels: data.map(item => item.label),
    datasets: [{
      label: 'Trend',
      data: data.map(item => item.value),
      borderColor: color || 'rgba(187, 0, 0, 1)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 2,
      tension: 0.3,
      fill: true
    }]
  }
}

export const generatePieChartConfig = (data, colorPalette) => {
  const defaultColors = [
    'rgba(0, 100, 0, 0.7)',
    'rgba(187, 0, 0, 0.7)',
    'rgba(255, 215, 0, 0.7)',
    'rgba(0, 0, 0, 0.7)',
    'rgba(255, 255, 255, 0.7)'
  ]
  
  const colors = colorPalette || defaultColors
  
  return {
    labels: data.map(item => item.label),
    datasets: [{
      data: data.map(item => item.value),
      backgroundColor: colors,
      borderWidth: 1
    }]
  }
}

export const calculateTrend = (data) => {
  if (!data || data.length < 2) return 0
  
  const first = data[0].value
  const last = data[data.length - 1].value
  
  if (first === 0) return last > 0 ? 100 : 0
  
  return ((last - first) / first) * 100
}