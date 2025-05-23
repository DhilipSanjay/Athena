import { Separator } from "@/components/ui/separator";
import { APP_NAME, PREFERENCES_WITH_EMOJIS } from "@/constants/common";
import { Button } from "../ui/button";
import { ArrowRight, Share } from "lucide-react";
import { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { IModule } from "@/interfaces/IModule";
import CShare from "../common/CShare";
import { useSession } from "@/hooks/auth-hooks";
import { signIn } from "@/lib/client";
import { ErrorContext } from "better-auth/react";
import { toast } from "sonner";
import { RiErrorWarningFill } from "@remixicon/react";

interface ModuleCardProps {
  module: IModule;
}

const ModuleCard: FC<ModuleCardProps> = ({ module }) => {
  const { data: session, isPending, isError } = useSession();
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const signInWithGoogle = async () => {
    await signIn.social(
      {
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/course/${module.courseId}/module/${module.moduleId}`,
      },
      {
        onRequest: () => {
          // set isSigningIn to true
          setIsSigningIn(true);
        },
        onError: (ctx: ErrorContext) => {
          // display the error message
          console.error(
            "Some error occurred while trying to sign in with Google:",
            ctx
          );
          setIsSigningIn(false);
          toast.error(
            <div className="flex flex-col gap-2">
              <div className="font-bold text-base flex items-center gap-1.5 uppercase w-fit">
                <RiErrorWarningFill className="h-5 w-5" />
                <span className="mt-[1px]">Error</span>
              </div>
              <div className="leading-relaxed font-medium text-sm">
                Some error occurred while trying to sign in with Google. Please
                try again.
              </div>
            </div>,
            {
              duration: Infinity,
              icon: null,
            }
          );
        },
      }
    );
  };

  return (
    <div className="p-4 rounded-lg border border-foreground/25 dark:bg-foreground/5 flex flex-col gap-2 shadow-lg">
      {/* Title */}
      <div className="text-lg font-bold line-clamp-1">{module.moduleTitle.toLowerCase().includes("module") ? module.moduleTitle.split(":")[1].trim() : module.moduleTitle}</div>
      <Separator className="bg-gradient-to-r from-primary to-transparent" />
      {/* Description */}
      <div className="text-base/loose text-justify text-muted-foreground line-clamp-6 prose dark:prose-invert min-w-full">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{module.moduleDescription}</ReactMarkdown>
      </div>
      {/* Did you know (TODO later) */}
      {/* <div className="text-sm/loose text-justify bg-secondary/10 p-4 rounded-lg flex flex-col gap-2">
        <div className="font-bold uppercase w-fit bg-secondary px-2 text-secondary-foreground">
          Did you know!
        </div>
        <div className="text-sm/loose text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </div> */}
      <div className="flex flex-col gap-2 h-fit m-auto mb-0 w-full">
        <Separator />
        {/* Part of course */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="text-sm font-medium w-fit">
            Part of course <Link href={`/course/${module.courseId}`}><span className="underline text-primary">{module.courseTopic}</span></Link>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES_WITH_EMOJIS["LEVEL"].filter((pref) => pref.toLowerCase().includes(module.preferences.level.toLowerCase()))}</div>
            <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES_WITH_EMOJIS["DURATION"].filter((pref) => pref.toLowerCase().includes(module.preferences.duration.toLowerCase()))}</div>
            <div className="border border-dashed border-foreground/25 py-1 px-2 rounded-md text-sm">{PREFERENCES_WITH_EMOJIS["FOCUS"].filter((pref) => pref.toLowerCase().includes(module.preferences.focus.toLowerCase()))}</div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-3">
            {/* Share icon */}
            <div className="grid grid-cols-1 w-full lg:w-fit">
              <CShare
                trigger={<Button variant="outline"><Share className="h-4 w-4" />Share</Button>}
                link={`${process.env.NEXT_PUBLIC_BASE_URL}/course/${module.courseId}/module/${module.moduleId}`}
                label={`Share this module!`}
                description={`Explore the module ${module.moduleTitle} which is a part of the course ${module.courseTopic} only on ${APP_NAME}!`}
              />
            </div>

            {!isPending && !isError && session ? <Link href={`/course/${module.courseId}/module/${module.moduleId}`} className="w-full lg:w-fit m-auto mr-0">
              <Button variant="outline" className="w-full hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground">
                View Module
                <ArrowRight />
              </Button>
            </Link> : <Button variant="outline" className="w-full lg:w-fit m-auto mr-0 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground" onClick={isSigningIn ? () => { } : signInWithGoogle}>
              {isSigningIn ? "Signing in..." : "View Module"}
              <ArrowRight />
            </Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
