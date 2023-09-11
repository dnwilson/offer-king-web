import './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <>
      <div className="error-page">
        <div className="content">
          <div className="lead">
            <h1 className="error-title">404</h1>
            <p className="error-subtitle">Page Not Found</p>
          </div>
          <p>
            Hit the back button or click <a href="/">here</a> to go the home
            page.
          </p>
        </div>
      </div>
    </>
  );
};
export default ErrorPage;
