import { useRouteError, Link } from "react-router-dom";
import '../style/error.css';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error">
      <h1 className="error__title">Oops!</h1>
      <p className="error__txt">Sorry, an unexpected error has occurred.</p>
      <p className="error__spec">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link className="error__link link" to="/" >Go back to login page</Link>
    </div>
  );
}

export default ErrorPage;