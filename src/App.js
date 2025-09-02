import logo from './logo.svg';
import './App.css';
import { Player } from '@remotion/player';
import MyVideo from './remotion/Collection/Collection';

function App() {
  return (
    <div className="App">
      Existting app
      <Player
        controls
        component={MyVideo}
        durationInFrames={900}
        fps={30}
        compositionHeight={720}
        compositionWidth={1280}
        style={{
          maxWidth: '640px',
          height: 'auto'
        }}
      />
    </div>
  );
}

export default App;
