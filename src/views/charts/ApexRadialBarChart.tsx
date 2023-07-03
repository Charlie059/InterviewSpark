// ** Component Import
import ReactApexcharts from 'src/@core/components/react-apexcharts'

import { ApexOptions } from 'apexcharts'

import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

interface RadialBarColors {
  series1: string;
  series2: string;
  series3: string;
  series4: string;
  series5: string;
}

const radialBarColors: RadialBarColors = {
  series1: '#fdd835',
  series2: '#40CDFA',
  series3: '#00d4bd',
  series4: '#7367f0',
  series5: '#FFA1A1'
}

interface ApexRadialBarChartProps {
  grade: string;
  score: number;
  size: number;
}

const ApexRadialBarChart: React.FC<ApexRadialBarChartProps> = ({grade, score, size}) => {
  const options: ApexOptions  = {
    colors: [radialBarColors.series3],
    plotOptions: {
      radialBar: {
        hollow: {
          size: '32%'
        },
        track: {
          margin: size/10
        },
        dataLabels: {
          name: {
            fontSize: '2rem',
            fontFamily: 'Montserrat'
          },
          value: {
            fontSize: '1rem',
            fontFamily: 'Montserrat'
          },
          total: {
            show: true,
            label: grade,
            fontSize: '1.2rem',
            fontFamily: 'Arial',
            formatter: function (w: any) {
              const totalValue =
                w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return a + b
                }, 0) / w.globals.series.length
              if (totalValue % 1 === 0) {
                return totalValue + '%'
              } else {
                return totalValue.toFixed(2) + '%'
              }
            }
          }
        }
      }
    },
    grid: {
      padding: {
        left: -20,
        right: 30,
        top: -70,
        bottom: -30
      }
    },
    legend: {
      show: false,
      position: 'bottom'
    },
    stroke: {
      lineCap: 'round'
    }
  }

  return (
    <ApexChartWrapper>
      <ReactApexcharts options={options} series={[score]} type='radialBar' height={size} />
    </ApexChartWrapper>
  )
}

export default ApexRadialBarChart
