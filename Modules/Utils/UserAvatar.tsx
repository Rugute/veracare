import Image from "next/image";
import { cn } from "@/lib/utils";
import Avatar from "@/assests/avatar-placeholder.png";

interface Props {
  AvatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ AvatarUrl, className, size }: Props) => {
  return (
    <Image
      src={AvatarUrl || Avatar}
      alt="user avatar"
      width={size || 48}
      height={size || 48}
      className={cn(
        "bg-secondary aspect-square h-fit flex-none rounded-full object-cover",
        className,
      )}
    />
  );
};

export default UserAvatar;
