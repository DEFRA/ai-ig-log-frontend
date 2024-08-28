import Chart from 'chart.js/auto'

function lineChartWithData(ctx, title, data) { // eslint-disable-line
  const labels = data.map((d) => d.label)
  const values = data.map((d) => d.value)
  const color = getRandomColor()
  const chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: title,
          data: values,
          borderWidth: 1,
          borderColor: color,
          backgroundColor: color + '33'
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })

  chartInstance.update()
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function lineChartWithMultipleData(ctx, data, xName, yName, labelName) { // eslint-disable-line
  const labels = [...new Set(data.map((d) => d[xName]))]

  const models = [...new Set(data.map((d) => d[labelName]))]

  const datasets = models.map((model) => {
    const modelData = data.filter((d) => d[labelName] === model)
    const values = labels.map((label) => {
      const entry = modelData.find((d) => d[xName] === label)
      return entry ? entry[yName] : 0
    })
    const color = getRandomColor()
    return {
      label: model,
      data: values,
      borderWidth: 1,
      borderColor: color,
      backgroundColor: color + '33'
    }
  })

  const chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })

  chartInstance.update()
}
