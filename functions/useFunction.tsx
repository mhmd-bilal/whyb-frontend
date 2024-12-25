import { useRouter } from "next/navigation";

export const BackHome = () => {
  return (
    <button
      onClick={() => {
        window.location.href = "/";
      }}
      className="text-blue-500 underline"
    >
      Go Back Home
    </button>
  );
};