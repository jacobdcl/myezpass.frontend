import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Bar, Pie, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

const ResultsPageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`

const SummaryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const ChartContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`

const ChartCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 400px;
  display: flex;
  flex-direction: column;
`

const ChartTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 10px;
`

const ChartWrapper = styled.div`
  flex-grow: 1;
  position: relative;
`

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const TableHeader = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
`

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 12px;
`

const TableContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
`

function ResultsPage() {
    const location = useLocation()
    const { data } = location.state || { data: [] }

    const totalAmount = data.reduce((sum, entry) => sum + Math.abs(entry.AMOUNT), 0).toFixed(2)
    const averageAmount = (totalAmount / data.length).toFixed(2)
    const maxAmount = Math.max(...data.map(entry => Math.abs(entry.AMOUNT))).toFixed(2)

    const agencyData = data.reduce((acc, entry) => {
        acc[entry.AGENCY] = (acc[entry.AGENCY] || 0) + Math.abs(entry.AMOUNT)
        return acc
    }, {})

    const fareTypeData = data.reduce((acc, entry) => {
        acc[entry['FARE TYPE']] = (acc[entry['FARE TYPE']] || 0) + Math.abs(entry.AMOUNT)
        return acc
    }, {})

    const monthlyData = data.reduce((acc, entry) => {
        const date = new Date(entry['TRANSACTION DATE'])
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`
        acc[monthYear] = (acc[monthYear] || 0) + Math.abs(entry.AMOUNT)
        return acc
    }, {})

    const barChartData = {
        labels: Object.keys(agencyData),
        datasets: [
            {
                label: 'Amount Spent',
                data: Object.values(agencyData).map(value => parseFloat(value.toFixed(2))),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    }

    const pieChartData = {
        labels: Object.keys(fareTypeData),
        datasets: [
            {
                data: Object.values(fareTypeData).map(value => parseFloat(value.toFixed(2))),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
            },
        ],
    }

    const lineChartData = {
        labels: Object.keys(monthlyData),
        datasets: [
            {
                label: 'Monthly Spending',
                data: Object.values(monthlyData).map(value => parseFloat(value.toFixed(2))),
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
            },
        },
    }

    return (
        <ResultsPageContainer>
            <SummaryContainer>
                <SummaryCard>
                    <h2>Total Spent</h2>
                    <p>${totalAmount}</p>
                </SummaryCard>
                <SummaryCard>
                    <h2>Average Transaction</h2>
                    <p>${averageAmount}</p>
                </SummaryCard>
                <SummaryCard>
                    <h2>Largest Transaction</h2>
                    <p>${maxAmount}</p>
                </SummaryCard>
            </SummaryContainer>
            <ChartContainer>
                <ChartCard>
                    <ChartTitle>Spending by Agency</ChartTitle>
                    <ChartWrapper>
                        <Bar data={barChartData} options={chartOptions} />
                    </ChartWrapper>
                </ChartCard>
                <ChartCard>
                    <ChartTitle>Spending by Fare Type</ChartTitle>
                    <ChartWrapper>
                        <Pie data={pieChartData} options={chartOptions} />
                    </ChartWrapper>
                </ChartCard>
                <ChartCard>
                    <ChartTitle>Monthly Spending Trend</ChartTitle>
                    <ChartWrapper>
                        <Line data={lineChartData} options={chartOptions} />
                    </ChartWrapper>
                </ChartCard>
            </ChartContainer>
            <h3>Transaction Details</h3>
            <TableContainer>
                <StyledTable>
                    <thead>
                        <tr>
                            <TableHeader>Transaction Date</TableHeader>
                            <TableHeader>Agency</TableHeader>
                            <TableHeader>Exit Plaza</TableHeader>
                            <TableHeader>Amount</TableHeader>
                            <TableHeader>Fare Type</TableHeader>
                            <TableHeader>Balance</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((entry, index) => (
                            <tr key={index}>
                                <TableCell>{entry['TRANSACTION DATE']}</TableCell>
                                <TableCell>{entry.AGENCY}</TableCell>
                                <TableCell>{entry['EXIT PLAZA']}</TableCell>
                                <TableCell>${Math.abs(entry.AMOUNT).toFixed(2)}</TableCell>
                                <TableCell>{entry['FARE TYPE']}</TableCell>
                                <TableCell>${entry.BALANCE.toFixed(2)}</TableCell>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            </TableContainer>
        </ResultsPageContainer>
    )
}

export default ResultsPage