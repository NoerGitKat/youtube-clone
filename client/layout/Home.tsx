import { AppShell, Box, Header, Navbar } from "@mantine/core";
import Image from "next/image";
import React, { ReactNode } from "react";

const HomePageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          Side Items
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Box>
            <Box>
              <Image
                src="/images/logo.svg"
                alt="YouTube Logo"
                width={100}
                height={40}
              />
            </Box>
          </Box>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default HomePageLayout;
