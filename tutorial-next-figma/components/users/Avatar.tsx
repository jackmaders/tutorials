import React, { useMemo } from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";
import { cn } from "@/lib/utils";

const IMAGE_SIZE = 48;

type UserInfo = NonNullable<Liveblocks["UserMeta"]["info"]>;

interface AvatarProps extends UserInfo {}

function Avatar({ avatar, name }: AvatarProps) {
  const fallbackAvatar = useMemo(
    () =>
      `https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`,
    [],
  );

  return (
    <div className={cn(styles.avatar, "size-9")} data-tooltip={name}>
      <Image
        // src={avatar}
        src={avatar ?? fallbackAvatar}
        alt={name ?? ""}
        height={IMAGE_SIZE}
        width={IMAGE_SIZE}
        className={styles.avatar_picture}
      />
    </div>
  );
}

export default Avatar;
