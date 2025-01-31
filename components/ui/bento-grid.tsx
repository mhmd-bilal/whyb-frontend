import { ReactNode } from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { IconHeartFilled, IconMessageCircleFilled } from "@tabler/icons-react"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto md:auto-rows-[20rem] w-full",
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  postId,
  className,
  title,
  description,
  header,
  userId,
  comments,
  icon,
  contextColor,
  likes,
  date,
  spanColumns = 1,
}: {
  postId?: string
  className?: string
  contextColor?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  spanColumns?: number
  userId?: string
  likes: number
  comments: number
  date: Date
}) => {
  const router = useRouter()
  const limitedTitle = (title: ReactNode): string => {
    if (typeof title === "string") {
      return title.length > 25 ? title.substring(0, 20) + "..." : title
    }
    return ""
  }

  const handleNavigation = () => {
    router.push(`/profile/${userId}`);
  };
  return (
    <div
      className={cn(
        "w-full cursor-pointer rounded-2xl group/bento hover:shadow-xl shadow-input dark:shadow-none dark:bg-card bg-white justify-between flex flex-col space-y-4 hover:scale-110 border z-0 hover:z-10 transition duration-500",
        className,
        spanColumns === 2
          ? "md:col-span-2 relative group-hover:z-20"
          : "md:col-span-1 p-4 "
      )}
      style={{
        borderColor: `${contextColor}40`,
        borderWidth: "0.1em",
        backgroundImage: spanColumns === 2
          ? `radial-gradient(circle, ${contextColor} -300%, transparent 70%)`
          : `radial-gradient(circle, ${contextColor} -150%, transparent 70%)`,
        backgroundSize: "100% 200%",
        backgroundPosition: "left bottom",
      }}
      onClick={() => router.push(`/post/${postId}`)}
    >
      <div
        className="relative flex flex-1 w-full aspect-square rounded-xl overflow-hidden border border-transparent bg-neutral-100 dark:bg-black z-0"
        style={{
          borderColor: spanColumns === 2 ? `none` : `${contextColor}30`,
          borderWidth: "0.1em",
        }}
      >
        {header}
        {spanColumns === 2 && (
          <>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-100 z-0" />
            <div className="absolute bottom-0 left-0 w-full p-4 z-10">
              <div
                className="font-sans font-bold text-neutral-200"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </div>
              <div
                className="font-sans font-normal text-neutral-400 text-xs cursor-pointer z-100 flex flex-row justify-between items-center gap-4"
                onClick={handleNavigation}
              >
                <span>@{description}</span>
                <div className="flex items-center gap-1 ">
                  <div className="flex items-center gap-1">
                    <IconMessageCircleFilled size={10} />
                    <span>{comments || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconHeartFilled size={10} />
                    <span>{likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {spanColumns === 1 && (
        <div>
          <div className="font-sans font-bold text-neutral-400 dark:text-neutral-200 mb-1 mt-2">
            {limitedTitle(title)}
          </div>
          <div
            className="font-sans font-normal text-neutral-400 text-xs cursor-pointer z-100 flex flex-row justify-between items-center gap-4"
            onClick={handleNavigation}
          >
            <span>@{description}</span>
            <div className="flex items-center gap-1 ">
              <div className="flex items-center gap-1">
                <IconMessageCircleFilled size={10} />
                <span>{comments || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <IconHeartFilled size={10} />
                <span>{likes}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
