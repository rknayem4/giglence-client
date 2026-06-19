

import FreelancerRegisterPage from "@/Components/auth/Freelancer";
import ClientRegisterPage from "@/Components/auth/RegisterClient";
import { Tabs } from "@heroui/react";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3B82F6]/10 via-white to-[#8B5CF6]/10 px-4 py-12">
      <h2 className="text-center text-2xl font-semibold mb-3">Registration </h2>
      <Tabs className="w-full max-w-xl mx-auto">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="client">
              As a Client
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="freelancer">
              As a Freelancer
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="client">
          <ClientRegisterPage />
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="freelancer">
          <FreelancerRegisterPage />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default RegisterPage;
