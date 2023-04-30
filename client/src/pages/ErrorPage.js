import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, []);

  return (
    <>
      <div>Not found!</div>
      <div>404</div>
      <div>Returning You back to Home page...</div>
    </>
  );
};

export default ErrorPage;
