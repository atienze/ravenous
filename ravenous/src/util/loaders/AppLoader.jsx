import './AppLoader.css';

// Component to display a loading indicator
const AppLoader = () => {
    return (
        // Container for the loader
        <div className="app-loader">
            {/* Loader GIF image */}
            <img src="/public/circles-loading.gif" alt="loader" />
        </div>
    );
};

export default AppLoader;