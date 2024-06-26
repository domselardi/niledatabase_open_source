"use client";
import { NileProvider, SingleSignOnForm } from "@niledatabase/react";
import { useRouter } from "next/navigation";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";

export default function SSOForm() {
  const { push } = useRouter();
  return (
    <NileProvider appUrl={process.env.NEXT_PUBLIC_APP_URL}>
      <Stack gap={2}>
        <Typography level="h1">Log in </Typography>
        <SingleSignOnForm
          onSuccess={() => {
            push("/settings");
          }}
        />
        <Typography>
          Not a user yet? <Link href="/sign-up">Sign up here</Link>
        </Typography>
      </Stack>
    </NileProvider>
  );
}
