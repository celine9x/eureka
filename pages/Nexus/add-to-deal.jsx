import React, { useState, useEffect } from "react";
import { Button } from "../../library/atoms/button.jsx";
import { Modal } from "../../library/organisms/modal.jsx";
import { Icon } from "../../library/atoms/icon.jsx";
import { DropdownList, DropdownSection, DropdownListItem } from "../../library/molecules/dropdown-list.jsx";
import { TextInput } from "../../library/molecules/text-input.jsx";

const DATA_SOURCE_OPTIONS = [
  {
    value: "clarivate",
    label: "Clarivate",
    assetName: "Tipifarnib",
    opportunityName: "Tipifarnib",
    companies: [
      { value: "chameleon", label: "Chameleon Development Lic", subinfo: "2 opportunities · United States" },
    ],
  },
  {
    value: "cortellis",
    label: "Cortellis",
    assetName: "Inavolisib",
    opportunityName: "Inavolisib",
    companies: [
      { value: "chameleon", label: "Chameleon Development Lic", subinfo: "2 opportunities · United States" },
      { value: "expression", label: "Expression Therapeutics", subinfo: "2 opportunities · UK" },
    ],
  },
  {
    value: "evaluate",
    label: "Evaluate Pharma",
    assetName: "Sotorasib",
    opportunityName: "Sotorasib",
    companies: [
      { value: "chameleon", label: "Chameleon Development Lic", subinfo: "2 opportunities · United States" },
      { value: "expression", label: "Expression Therapeutics", subinfo: "2 opportunities · UK" },
    ],
  },
];

const INITIATIVE_OPTIONS = [
  { value: "alzheimers", label: "Alzheimer" },
  { value: "dermatology", label: "Dermatology" },
  { value: "oncology", label: "Oncology" },
];

function SelectField({ label, isRequired, value, placeholder, disabled = false, error = false, helper, onClick, children }) {
  return (
    <div style={{ position: "relative" }}>
      <TextInput
        label={label}
        isRequired={isRequired}
        value={value ? value.label : ""}
        placeholder={placeholder}
        disabled={disabled}
        readOnly
        error={error ? "This field is mandatory" : undefined}
        helper={helper}
        iconTrailing={<Icon name="ChevronDown" size="sm" />}
        onClick={onClick}
      />
      {children && (
        <div style={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 8px)", zIndex: 20 }}>
          {children}
        </div>
      )}
    </div>
  );
}


const AddAssetToDealModal = ({ variant = "default" }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [assetName, setAssetName] = useState("");
  const [opportunityName, setOpportunityName] = useState("");
  const [selectedInitiative, setSelectedInitiative] = useState({ value: "alzheimers", label: "Alzheimer" });

  const companyOptions = selectedSource ? selectedSource.companies : [];

  useEffect(() => {
    if (!selectedSource) {
      setSelectedCompany(null);
      return;
    }

    const sourceCompanies = selectedSource.companies || [];
    setSelectedCompany(sourceCompanies[0] || null);
    setAssetName(selectedSource.assetName || "");
    setOpportunityName(selectedSource.opportunityName || "");
  }, [selectedSource]);

  const sourceRequired = hasAttemptedSubmit && !selectedSource;
  const showHelperText = !selectedSource && !hasAttemptedSubmit;
  const initiativeRequired = hasAttemptedSubmit && !selectedInitiative;
  const assetNameRequired = !!selectedSource && !assetName.trim();
  const opportunityNameRequired = !!selectedSource && !opportunityName.trim();
  const showCompanyMenu = openMenu === "company" && !!selectedSource;

  const handleSourceSelect = (option) => {
    setSelectedSource(option);
    setOpenMenu(null);
  };

  const handleSubmit = (mode) => {
    setHasAttemptedSubmit(true);

    if (!selectedSource || !selectedInitiative || !assetName.trim() || !opportunityName.trim()) {
      return;
    }

    if (mode === "open") {
      console.log("Add and open in Deal");
      return;
    }

    console.log("Add asset to deal");
  };

  const footer = (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: 12 }}>
      <Button variant="tertiary" size="lg" onClick={() => {}}>
        Cancel
      </Button>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button variant="secondary" size="lg" onClick={() => handleSubmit("open")}>
          Add and open in Deal
        </Button>
        <Button variant="primary" size="lg" onClick={() => handleSubmit("add")}>
          Add
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      open
      onClose={() => {}}
      title="Add asset to Deal"
      size="md"
      showFooter
      contentPadding
      footer={footer}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <SelectField
          label="Data source"
          value={selectedSource}
          isRequired
          placeholder="Select data source"
          error={sourceRequired}
          helper={showHelperText ? "Select data source to populate other fields" : undefined}
          onClick={() => setOpenMenu(openMenu === "source" ? null : "source")}
        >
          {openMenu === "source" && (
            <div style={{ background: "var(--color-general-white)", border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "var(--shadow-button-hover)" }}>
              <DropdownList noAdd noSearch>
                <DropdownSection>
                  {DATA_SOURCE_OPTIONS.map((option) => (
                    <DropdownListItem
                      key={option.value}
                      value={option.value}
                      active={selectedSource?.value === option.value}
                      onChange={() => handleSourceSelect(option)}
                    >
                      {option.label}
                    </DropdownListItem>
                  ))}
                </DropdownSection>
              </DropdownList>
            </div>
          )}
        </SelectField>

        <TextInput
          label="Asset name"
          value={assetName}
          placeholder="Name your asset"
          disabled={!selectedSource}
          error={assetNameRequired ? "This field is mandatory" : undefined}
          onChange={(event) => setAssetName(event.target.value)}
        />

        <div style={{ position: "relative" }}>
          <TextInput
            label="Company"
            value={selectedCompany ? selectedCompany.label : ""}
            placeholder="Select company"
            disabled={!selectedSource}
            readOnly
            iconTrailing={<Icon name="ChevronDown" size="sm" />}
            onClick={() => setOpenMenu((prev) => (prev === "company" ? null : "company"))}
          />

          {showCompanyMenu && (
            <div style={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 8px)", zIndex: 30, background: "var(--color-general-white)", border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-button-hover)", overflow: "hidden" }}>
              <DropdownList noAdd noSearch style={{ borderRadius: 0, boxShadow: "none", outline: "none" }}>
                <DropdownSection>
                  {companyOptions.map((company) => (
                    <DropdownListItem
                      key={company.value}
                      value={company.value}
                      active={selectedCompany?.value === company.value}
                      onChange={() => {
                        setSelectedCompany(company);
                        setOpenMenu(null);
                      }}
                    >
                      {company.label}
                    </DropdownListItem>
                  ))}
                </DropdownSection>
              </DropdownList>
            </div>
          )}
        </div>

        <TextInput
          label="Opportunity name"
          value={opportunityName}
          placeholder="Name your opportunity"
          disabled={!selectedSource}
          error={opportunityNameRequired ? "This field is mandatory" : undefined}
          onChange={(event) => setOpportunityName(event.target.value)}
        />

        <SelectField
          label="Initiative"
          isRequired
          value={selectedInitiative}
          placeholder="Select initiative"
          error={initiativeRequired}
          onClick={() => setOpenMenu(openMenu === "initiative" ? null : "initiative")}
        >
          {openMenu === "initiative" && (
            <div style={{ position: "relative", zIndex: 20, marginTop: 8 }}>
              <div style={{ background: "var(--color-general-white)", border: "1px solid var(--color-action-outline-secondary-enabled)", borderRadius: "var(--radius-md)", overflow: "hidden", boxShadow: "var(--shadow-button-hover)" }}>
                <DropdownList noAdd>
                  <DropdownSection>
                    {INITIATIVE_OPTIONS.map((option) => (
                      <DropdownListItem
                        key={option.value}
                        value={option.value}
                        active={selectedInitiative?.value === option.value}
                        onChange={() => {
                          setSelectedInitiative(option);
                          setOpenMenu(null);
                        }}
                      >
                        {option.label}
                      </DropdownListItem>
                    ))}
                  </DropdownSection>
                </DropdownList>
              </div>
            </div>
          )}
        </SelectField>
      </div>
    </Modal>
  );
};

export default function AddToDealPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "var(--spacing-8)", background: "var(--color-general-neutral-lighter)", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <div style={{ display: "grid", gridTemplateColumns: "280px minmax(540px, 760px)", gap: "var(--spacing-8)", alignItems: "stretch" }}>
        <aside style={{ background: "var(--color-general-informative)", borderRadius: "var(--radius-md)", minHeight: 430, padding: "var(--spacing-6)", display: "flex", alignItems: "flex-start" }}>
          <div style={{ fontFamily: "var(--font-family-primary)", fontSize: "var(--text-heading-h2)", fontWeight: "var(--font-weight-bold)", lineHeight: 1.1, color: "var(--color-content-primary)", whiteSpace: "pre-line" }}>
            {`As a user,\nwhen I create\nan Opportunity\nin Deal from\nMarket Intelligence, I\ncan choose to\nadd and open\nthe Deal\nOpportunity\npage in a new tab to allow me to make any additional edits.`}
          </div>
        </aside>

        <div style={{ width: "100%" }}>
          <AddAssetToDealModal variant="default" />
        </div>
      </div>
    </div>
  );
}
