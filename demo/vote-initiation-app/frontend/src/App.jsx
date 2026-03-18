import React, { useState } from 'react'
import Layout from './components/Layout'
import SignIn from './components/SignIn'
import VoteNumber from './components/VoteNumber'
import MetaData from './components/MetaData'
import VotingType from './components/VotingType'
import Details from './components/Details'
import Summary from './components/Summary'
import Processing from './components/Processing'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [sessionId, setSessionId] = useState(null)

  const advance = () => setCurrentScreen(s => s + 1)

  const renderScreen = () => {
    switch (currentScreen) {
      case 1:
        return <SignIn onSuccess={(sid) => { setSessionId(sid); advance() }} />
      case 2:
        return <VoteNumber sessionId={sessionId} onSuccess={advance} />
      case 3:
        return <MetaData sessionId={sessionId} onSuccess={advance} />
      case 4:
        return <VotingType sessionId={sessionId} onSuccess={advance} />
      case 5:
        return <Details sessionId={sessionId} onSuccess={advance} />
      case 6:
        return <Summary sessionId={sessionId} onSuccess={advance} />
      case 7:
        return <Processing sessionId={sessionId} />
      default:
        return null
    }
  }

  return (
    <Layout currentScreen={currentScreen}>
      {renderScreen()}
    </Layout>
  )
}
