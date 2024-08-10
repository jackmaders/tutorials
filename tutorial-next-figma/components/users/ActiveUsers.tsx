import { useOthers, useSelf } from "@liveblocks/react/suspense";
import Avatar from "./Avatar";
import styles from "./AvatarUsers.module.css";
import { useMemo } from "react";

function ActiveUsers() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <div className="flex py-2">
      {users.slice(0, 3).map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} avatar={info?.avatar} name={info?.name} />
        );
      })}

      {hasMoreUsers && <div className={styles.more}>+{users.length - 3}</div>}

      {currentUser && (
        <div className="relative first:ml-0">
          <Avatar avatar={currentUser.info?.avatar} name="You" />
        </div>
      )}
    </div>
  );
}

export default ActiveUsers;
