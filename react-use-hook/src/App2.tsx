// import {useLifecycles} from 'react-use';
import { useLifecycles } from "./useHooks_my";

const App = () => {
  useLifecycles(() => console.log('MOUNTED'), () => console.log('UNMOUNTED'));

  return null;
};

export default App;
