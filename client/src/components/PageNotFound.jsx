import { Button } from "flowbite-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Page Not Found</p>
      <Button color="blue" onClick={() => (window.location.href = "/")}>
        Go Home
      </Button>
    </div>
  );
}

export default NotFound;
