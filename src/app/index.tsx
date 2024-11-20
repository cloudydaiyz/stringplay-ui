import { AppRouter } from './router';

function App() {
    return (
        <div 
            style={{
                minHeight: '100vh',
                height: '500px', 
                minWidth: '768px', 
                position: 'relative', 
                width: '100vw',
                zIndex: 10,
            }}
        >
            <AppRouter />
        </div>
    );
}

export default App;