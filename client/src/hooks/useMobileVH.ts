import { useEffect } from "react";

function useMobileVH() {
  useEffect(() => {
    // https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html#comment-4634921967
    function setDocHeight() {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight / 100}px`
      );
    }

    setDocHeight();

    window.addEventListener("resize", setDocHeight);
    window.addEventListener("orientationchange", setDocHeight);

    return function cleanup() {
      window.removeEventListener("resize", setDocHeight);
      window.removeEventListener("orientationchange", setDocHeight);
    };
  });
}

export default useMobileVH