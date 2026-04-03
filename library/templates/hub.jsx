/**
 * Hub Template
 *
 * A complete page layout template combining SideMenu, HubHeader, Table, and Pagination.
 * Use this as a starting point for list/hub pages in your application.
 */

import React, { useState } from "react";
import { SideMenu } from "../organisms/side-menu/side-menu.jsx";
import {
  HubHeader,
  HubHeaderActions,
} from "../organisms/hub-header.jsx";
import {
  Table,
  TableRow,
  TableCell,
  TableCellHeader,
} from "../organisms/table/table.jsx";
import { Pagination } from "../organisms/pagination.jsx";
import { Button } from "../atoms/button.jsx";
import { Icon } from "../atoms/icon.jsx";
import { Checkbox } from "../atoms/checkbox.jsx";

/* ===========================================
   STYLE CONFIGURATION
   =========================================== */

const styles = {
  base: `
    .hub {
      display: flex;
      height: 100vh;
      width: 100%;
      overflow: hidden;
    }
    .hub__sidebar {
      flex-shrink: 0;
    }
    .hub__main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--color-neutral-50);
    }
    .hub__header {
      flex-shrink: 0;
      background: var(--color-neutral-0);
      border-bottom: 1px solid var(--color-neutral-200);
    }
    .hub__body {
      flex: 1;
      overflow-y: auto;
      padding: var(--spacing-6);
    }
    .hub__table-container {
      background: var(--color-neutral-0);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-neutral-200);
      overflow: hidden;
    }
    .hub__footer {
      flex-shrink: 0;
      padding: var(--spacing-4) var(--spacing-6);
      background: var(--color-neutral-0);
      border-top: 1px solid var(--color-neutral-200);
    }
    .hub__empty {
      text-align: center;
      padding: var(--spacing-8);
      color: var(--color-neutral-500);
      font-family: var(--font-family-primary);
      font-size: var(--text-body-md);
    }
  `,
};

/* ===========================================
   STYLE INJECTION (SSR-safe)
   =========================================== */

let stylesInjected = false;

const injectStyles = () => {
  if (stylesInjected || typeof document === "undefined") return;

  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-eureka", "hub-template");
  styleEl.textContent = styles.base;
  document.head.appendChild(styleEl);
  stylesInjected = true;
};

/* ===========================================
   HUB TEMPLATE COMPONENT
   =========================================== */

/**
 * Hub
 *
 * A complete hub/list page template with sidebar navigation, header, table, and pagination.
 *
 * @param {string} title - Page title for the header
 * @param {string} badge - Badge text for the header (e.g., item count)
 * @param {ReactNode} headerActions - Action buttons for the header
 * @param {ReactNode} headerSecondary - Secondary content below the header (e.g., filters)
 * @param {Array} menuSections - Sections for the side menu
 * @param {object} menuUser - User object for the side menu
 * @param {string} logoSrc - Logo image URL for the side menu
 * @param {function} onMenuCreate - Create button handler for the side menu
 * @param {function} onMenuSearch - Search handler for the side menu
 * @param {Array} columns - Table column definitions [{ key, label, sortable, width, render }]
 * @param {Array} data - Table row data
 * @param {function} renderRow - Custom row renderer (row, index) => ReactNode
 * @param {Array} selectedRows - Array of selected row IDs
 * @param {function} onRowSelect - Row selection handler (id) => void
 * @param {function} onSelectAll - Select all handler
 * @param {string} sortColumn - Current sort column key
 * @param {string} sortDirection - Current sort direction (asc|desc|"")
 * @param {function} onSort - Sort handler (columnKey, direction) => void
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {number} pageSize - Items per page
 * @param {function} onPageChange - Page change handler
 * @param {function} onPageSizeChange - Page size change handler
 * @param {boolean} showPagination - Show pagination (default: true)
 * @param {boolean} showCheckbox - Show row checkboxes (default: false)
 * @param {ReactNode} paginationAction - Custom action button for pagination
 * @param {string} emptyMessage - Message to show when no data (default: "No data available")
 * @param {string} className - Additional CSS classes
 *
 * @example
 * <Hub
 *   title="Companies"
 *   badge="124"
 *   logoSrc="/logo.png"
 *   menuSections={[
 *     { items: [{ label: "Home", iconName: "Home" }] },
 *   ]}
 *   menuUser={{ name: "John", email: "john@example.com" }}
 *   headerActions={<Button variant="primary">Add Company</Button>}
 *   columns={[
 *     { key: "name", label: "Name", sortable: true },
 *     { key: "status", label: "Status", render: (val) => <Chip>{val}</Chip> },
 *   ]}
 *   data={companies}
 *   currentPage={1}
 *   totalPages={10}
 *   pageSize={10}
 *   onPageChange={setPage}
 * />
 */
export const Hub = ({
  // Header props
  title = "Hub",
  badge,
  headerActions,
  headerSecondary,
  // Menu props
  menuSections = [],
  menuUser,
  logoSrc,
  onMenuCreate,
  onMenuSearch,
  // Table props
  columns = [],
  data = [],
  renderRow,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  sortColumn,
  sortDirection,
  onSort,
  showCheckbox = false,
  emptyMessage = "No data available",
  // Pagination props
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  onPageChange,
  onPageSizeChange,
  showPagination = true,
  paginationAction,
  // General
  className = "",
  ...props
}) => {
  injectStyles();

  const classes = ["hub", className].filter(Boolean).join(" ");

  // Handle sort
  const handleSort = (column) => {
    if (!column.sortable) return;

    const newDirection =
      sortColumn === column.key
        ? sortDirection === "asc"
          ? "desc"
          : sortDirection === "desc"
          ? ""
          : "asc"
        : "asc";

    onSort?.(column.key, newDirection);
  };

  // Check if all rows are selected
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  // Default row renderer
  const defaultRenderRow = (row, index) => (
    <TableRow
      key={row.id || index}
      selected={selectedRows.includes(row.id)}
    >
      {showCheckbox && (
        <TableCell style={{ width: 48 }}>
          <Checkbox
            checked={selectedRows.includes(row.id)}
            onChange={() => onRowSelect?.(row.id)}
          />
        </TableCell>
      )}
      {columns.map((col) => (
        <TableCell key={col.key} style={col.width ? { width: col.width } : undefined}>
          {col.render ? col.render(row[col.key], row) : row[col.key]}
        </TableCell>
      ))}
    </TableRow>
  );

  const rowRenderer = renderRow || defaultRenderRow;

  // Default pagination action
  const defaultPaginationAction = (
    <Button
      variant="secondary"
      size="md"
      iconLeading={<Icon name="ArrowDownTray" size="sm" />}
      style={{ width: 32, padding: 0, justifyContent: "center" }}
    />
  );

  return (
    <div className={classes} {...props}>
      {/* Side Menu */}
      <div className="hub__sidebar">
        <SideMenu
          logoSrc={logoSrc}
          sections={menuSections}
          user={menuUser}
          onCreateClick={onMenuCreate}
          onSearchSubmit={onMenuSearch}
        />
      </div>

      {/* Main Content */}
      <div className="hub__main">
        {/* Header */}
        <div className="hub__header">
          <HubHeader
            title={title}
            badge={badge}
            rightContent={headerActions}
            secondaryContent={headerSecondary}
          />
        </div>

        {/* Body with Table */}
        <div className="hub__body">
          <div className="hub__table-container">
            <Table>
              {/* Table Header */}
              <TableRow variant="header">
                {showCheckbox && (
                  <TableCellHeader style={{ width: 48 }}>
                    <Checkbox
                      checked={allSelected}
                      indeterminate={someSelected}
                      onChange={() => onSelectAll?.()}
                    />
                  </TableCellHeader>
                )}
                {columns.map((col) => (
                  <TableCellHeader
                    key={col.key}
                    sortable={col.sortable}
                    sort={sortColumn === col.key ? sortDirection : ""}
                    onSort={() => handleSort(col)}
                    style={col.width ? { width: col.width } : undefined}
                  >
                    {col.label}
                  </TableCellHeader>
                ))}
              </TableRow>

              {/* Table Body */}
              {data.map((row, index) => rowRenderer(row, index))}

              {/* Empty State */}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + (showCheckbox ? 1 : 0)}>
                    <div className="hub__empty">{emptyMessage}</div>
                  </TableCell>
                </TableRow>
              )}
            </Table>
          </div>
        </div>

        {/* Footer with Pagination */}
        {showPagination && (
          <div className="hub__footer">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              actionButton={paginationAction !== undefined ? paginationAction : defaultPaginationAction}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Hub.displayName = "Hub";

export default Hub;
