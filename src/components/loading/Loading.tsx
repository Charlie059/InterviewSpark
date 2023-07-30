import styled from 'styled-components'
import DynamicWaveLoading from './DynamicWaveLoading'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(100px);
  z-index: 1000;
`

const Layer = styled.div`
  margin: 20px;
`

const Text = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 24px;
  text-align: center;
`

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  font-size: 36px;
  text-align: center;
`

interface LoadingScreenProps {
  smText: string
  lgText: string
}

const LoadingScreen: React.FC<LoadingScreenProps> = (loadingScreenProps: LoadingScreenProps) => {
  const { smText, lgText } = loadingScreenProps

  return (
    <Container>
      <Layer>
        <DynamicWaveLoading />
      </Layer>

      <Layer>
        <Text>{smText}</Text>
      </Layer>

      <Layer>
        <Title>{lgText}</Title>
      </Layer>
    </Container>
  )
}

export default LoadingScreen
