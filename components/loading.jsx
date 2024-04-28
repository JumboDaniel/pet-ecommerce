import { Loader } from "lucide-react";

export const LoadingOverlay = ({ isLoading }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center ${
        !isLoading && "hidden"
      }`}
    >
      <Loader size="48" color="white" className="animate-spin" />
    </div>
  );
};
