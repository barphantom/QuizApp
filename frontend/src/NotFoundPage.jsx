import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <h1>404 Not Found Page</h1>
            <h3>The page you are looking for does not exists!</h3>
            <Link to={"/"}>
                <button>Go back Home</button>
            </Link>
        </div>
    )
}

export default NotFoundPage
