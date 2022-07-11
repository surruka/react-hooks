// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {fetchPokemon, PokemonInfoFallback, PokemonDataView, PokemonForm} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       hasError: false
//     };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h3>Something went wrong</h3>
//     }
//     return this.props.children;
//   }
// }

const RequestStatus = {
  Idle:     'idle',
  Pending:  'pending',
  Resolved: 'resolved',
  Rejected: 'rejected'
}

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: RequestStatus.Idle,
    pokemon: null,
    error: null
  });
    React.useEffect(() => {
      if (!pokemonName) return;
      setState((currentStatus) => ({
        ...currentStatus,
        status: RequestStatus.Idle
      }));
      fetchPokemon(pokemonName)
        .then((pokemon) => {
          setState((currentStatus) => ({
            ...currentStatus,
            pokemon,
            status: RequestStatus.Resolved
          }));
        })
        .catch(error => {
          setState((currentStatus) => ({
            ...currentStatus,
            error,
            status: RequestStatus.Rejected
          }));          
        })
    }, [pokemonName])
    const {status} = state;
    if (status === RequestStatus.Rejected) throw state.error;
    return (
      <>
        {status === RequestStatus.Idle && 'Submit a pokemon'}
        {status === RequestStatus.Pending && <PokemonInfoFallback name={pokemonName} />}
        {status === RequestStatus.Resolved && <PokemonDataView pokemon={state.pokemon} />}
      </>
    );
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  const handleOnReset = () => {
    setPokemonName(null)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName}
          FallbackComponent={ErrorFallback}
          resetKeys={[pokemonName]}
          onReset={handleOnReset} >
          <PokemonInfo pokemonName={pokemonName} />  
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
