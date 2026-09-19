import React, { useState } from "react";
import { ObjectPage } from "../../library/templates/object-page.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";
import { Toggle } from "../../library/atoms/toggle.jsx";
import { Subinfo } from "../../library/molecules/subinfo.jsx";
import { Chip } from "../../library/atoms/chip.jsx";
import ActiveIcon from "../../library/atoms/custom-icons/status/Opportunity/Active.svg";


const OpportunityPage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const subinfoItems = [
    {
      component: (
        <Subinfo
          variant="status"
          statusIcon={<img src={ActiveIcon} alt="" aria-hidden="true" style={{ width: 16, height: 16 }} />}
          bordered={false}
        >
          Active
        </Subinfo>
      ),
    },
    {
      component: (
        <Subinfo variant="avatar" initials="ED" bordered={false}>
          Emma Dupont
        </Subinfo>
      ),
    },
    {
      component: (
        <Subinfo bordered={false} href="#">
          Acme Corporation
        </Subinfo>
      ),
    },
    {
      component: (
        <Subinfo variant="chips" bordered={false}>
          <Chip>Enterprise</Chip>
          <Chip>Software</Chip>
        </Subinfo>
      ),
    },
  ];

  const steps = [
    { title: "Lead" },
    { title: "Qualification" },
    { title: "Proposal" },
    { title: "Negotiation" },
    { title: "Closed" },
  ];

  const leftColumnSections = [
    {
      title: "Opportunity Details",
      defaultExpanded: true,
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
          <TextInput label="Opportunity Name" defaultValue="Opportunity page" />
          <TextInput label="Account Name" defaultValue="Acme Corporation" />
          <TextInput label="Contact" defaultValue="John Smith" />
          <TextInput label="Amount" defaultValue="$125,000" />
              <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />    <TextInput label="Amount" defaultValue="$125,000" />
        </div>
      ),
    },
    {
      title: "Description",
      defaultExpanded: true,
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
          <TextInput
            label="Description"
            defaultValue="Enterprise software license deal for Acme Corporation's engineering team."
          />
        </div>
      ),
    },
  ];

  const rightColumnSections = [
    {
      title: "Key Dates",
      defaultExpanded: true,
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
          <TextInput label="Created Date" defaultValue="Jan 15, 2024" disabled />
          <TextInput label="Expected Close Date" defaultValue="Mar 30, 2024" />
          <TextInput label="Last Activity" defaultValue="Feb 20, 2024" disabled />
        </div>
      ),
    },
    {
      title: "Settings",
      defaultExpanded: false,
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
          <Toggle label="Send notifications" defaultChecked />
          <Toggle label="Auto-update forecast" defaultChecked />
        </div>
      ),
    },
  ];

  return (
    <ObjectPage
      title="Opportunity page"
      titleIconName="opportunity"
      menuActiveItemId="1-1"
      menuUser={{
        name: "Emma Dupont",
        email: "emma.dupont@inpart.io",
        avatarInitials: "ED",
      }}
      onMenuCreate={() => {}}
      topBarLeft={
        <ObjectPage.Button
          variant="secondary"
          size="sm"
          iconLeading={<ObjectPage.Icon name="ArrowLeft" size="sm" />}
        >
          Back
        </ObjectPage.Button>
      }
      topBarRight={
        <ObjectPage.Header.ActionsGroup>
          <ObjectPage.Button variant="secondary" size="sm">
            Cancel
          </ObjectPage.Button>
          <ObjectPage.Button variant="primary" size="sm">
            Save
          </ObjectPage.Button>
        </ObjectPage.Header.ActionsGroup>
      }
      meta={{
        label: "Last updated on",
        date: "Feb 20, 2024",
        author: "Emma Dupont",
      }}
      subinfoItems={subinfoItems}
      steps={steps}
      currentStep={1}
      tabs={
        <ObjectPage.Tabs selectedKey={activeTab} onSelectionChange={setActiveTab}>
          <ObjectPage.Tab id="overview">Overview</ObjectPage.Tab>
          <ObjectPage.Tab id="activity">Details</ObjectPage.Tab>
          <ObjectPage.Tab id="contacts" badge={12}>Contacts</ObjectPage.Tab>
          <ObjectPage.Tab id="attachments" badge={3}>Attachments</ObjectPage.Tab>
          <ObjectPage.Tab id="related-information">Related information</ObjectPage.Tab>
        </ObjectPage.Tabs>
      }
      leftColumnSections={leftColumnSections}
      rightColumnSections={rightColumnSections}
    />
  );
};

export default OpportunityPage;
