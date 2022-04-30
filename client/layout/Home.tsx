import { Anchor, AppShell, Box, Header, Navbar } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { UploadVideo } from "../components";
import { useMe } from "../context/me";

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  const { user, refetch } = useMe();

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 250 }} height={500} p="xs">
          Side Items
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Box sx={() => ({ display: "flex" })}>
            <Box sx={() => ({ flex: "1" })}>
              <Image
                src="/images/logo.svg"
                alt="YouTube Logo"
                width={100}
                height={40}
              />
            </Box>
            {!user && (
              <>
                <Link href="/auth/login" passHref>
                  <Anchor ml="lg" mr="lr">
                    Login
                  </Anchor>
                </Link>
                <Link href="/auth/register" passHref>
                  <Anchor ml="lg" mr="lr">
                    Register
                  </Anchor>
                </Link>
              </>
            )}

            {user && <UploadVideo />}
          </Box>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default HomePageLayout;
