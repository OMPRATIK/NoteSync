import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";

import { ClerkProvider, useAuth, SignIn } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import FullScreenLoader from "./FullScreenLoader";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="min-h-screen flex flex-col items-center justify-center gap-2 dark:bg-neutral-800 ">
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label="Loading" />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
