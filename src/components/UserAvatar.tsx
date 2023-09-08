import React from "react";
import { User } from "next-auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

type Props = {
    user: Pick<User, "name" | "image">;
};

const UserAvatar = ({ user }: Props) => {
    return (
        <Avatar>
            {user.image ? (
                <div className="relative w-full h-full aspect-square">
                    <Image
                        fill
                        src={user.image}
                        alt="Profile Image"
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <AvatarFallback>
                    <span className="sr-only ">{user?.name} </span>
                </AvatarFallback>
            )}
        </Avatar>
    );
};

export default UserAvatar;
