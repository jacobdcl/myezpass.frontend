import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import csv from 'csvtojson'
import { FaUpload } from 'react-icons/fa'

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const FileInputLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.lightGrey};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    color: white;
  }
`

const FileInput = styled.input`
  display: none;
`

const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  max-width: 300px;

  &:disabled {
    background-color: ${props => props.theme.colors.lightGrey};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.secondary};
  }
`

function HomePage() {
    const [file, setFile] = useState(null)
    const navigate = useNavigate()

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (file) {
            const reader = new FileReader()
            reader.onload = async (e) => {
                const text = e.target.result
                const jsonArray = await csv().fromString(text)
                const processedData = jsonArray.map(row => ({
                    ...row,
                    AMOUNT: Math.abs(parseFloat(row.AMOUNT.replace('$', '')) || 0),
                    BALANCE: parseFloat(row.BALANCE.replace('$', '')) || 0
                }))
                navigate('/results', { state: { data: processedData } })
            }
            reader.readAsText(file)
        }
    }

    return (
        <HomePageContainer>
            <h2>Upload your EZPass CSV file</h2>
            <StyledForm onSubmit={handleSubmit}>
                <FileInputLabel htmlFor="file-upload">
                    <FaUpload style={{ marginRight: '0.5rem' }} />
                    {file ? file.name : 'Choose a file'}
                </FileInputLabel>
                <FileInput
                    id="file-upload"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                />
                <SubmitButton type="submit" disabled={!file}>
                    Analyze Data
                </SubmitButton>
            </StyledForm>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '60vw' }}>
                <br /><br />
                ez-passny.com
                <br /><br /><br />
                <img src="/tut1.png" alt="tutorial" style={{ width: '100%' }} />
                <br />
                <img src="/tut2.png" alt="tutorial" style={{ width: '100%' }} />
                <br />
                <img src="/tut3.png" alt="tutorial" style={{ width: '100%' }} />
                <br />
                <img src="/tut4.png" alt="tutorial" style={{ width: '100%' }} />
            </div>
        </HomePageContainer>
    )
}

export default HomePage
