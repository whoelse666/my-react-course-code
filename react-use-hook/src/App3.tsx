import { useEffect, useState } from 'react';
// import {useMountedState} from 'react-use';
import { useMountedState } from "./useHooks_my";

const App = () => {
    const isMounted = useMountedState();
    const [,setNum ] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setNum(1);
        }, 1000);
    }, []);

    return <div>{ isMounted() ? 'mounted' : 'pending' }</div>
};

export default App;
