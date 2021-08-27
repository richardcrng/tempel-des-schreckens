import { useStorageState } from "react-storage-hooks";
import { useSocket } from "../socket";
import { useEffect } from "react";

function useSocketAliases() {
  const socket = useSocket();

  const [socketAliases, setSocketAliases] = useStorageState(
    sessionStorage,
    "socketAliases",
    [] as string[]
  );

  useEffect(() => {
    if (socket && !socketAliases.includes(socket.id)) {
      setSocketAliases([...socketAliases, socket.id]);
    }
  });

  return socketAliases;
}

export default useSocketAliases;
