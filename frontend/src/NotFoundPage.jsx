import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div>
            <h1>Not Found Page</h1>
            <h3>This is a custom error message</h3>
            <Link to={"/"}>
                <button>Go back Home</button>
            </Link>
        </div>
    )
}

export default NotFoundPage
