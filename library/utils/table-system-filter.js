/**
 * Table System Filter Utilities
 *
 * Shared helpers to:
 * 1) Build backend query payloads for table screens
 * 2) Filter datasets on the client with one standard config
 * 3) Map backend records into Table row shapes (badge, badges, long text, etc.)
 */

const isEmptyValue = (value) =>
  value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);

const getValue = (record, keyOrGetter) => {
  if (typeof keyOrGetter === "function") return keyOrGetter(record);
  if (typeof keyOrGetter === "string") return record?.[keyOrGetter];
  return undefined;
};

const normalizeText = (value) => String(value ?? "").trim().toLowerCase();

export const TABLE_FILTER_OPERATORS = {
  equals: "equals",
  notEquals: "notEquals",
  in: "in",
  notIn: "notIn",
  contains: "contains",
  startsWith: "startsWith",
  endsWith: "endsWith",
  gte: "gte",
  lte: "lte",
  gt: "gt",
  lt: "lt",
  custom: "custom",
};

export const buildTableQuery = ({
  page = 1,
  pageSize = 25,
  search = "",
  filters = {},
  sort = undefined,
  extra = {},
} = {}) => {
  const sanitizedFilters = Object.entries(filters).reduce((acc, [key, value]) => {
    if (!isEmptyValue(value)) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return {
    page,
    pageSize,
    search: search?.trim?.() || "",
    filters: sanitizedFilters,
    sort,
    ...extra,
  };
};

export const applyTableSystemFilters = ({
  records = [],
  search = "",
  searchableFields = [],
  filters = [],
} = {}) => {
  const normalizedSearch = normalizeText(search);

  return records.filter((record) => {
    if (normalizedSearch) {
      const matchesSearch = searchableFields.some((field) => {
        const value = getValue(record, field);
        return normalizeText(value).includes(normalizedSearch);
      });

      if (!matchesSearch) return false;
    }

    for (const filter of filters) {
      const {
        field,
        getter,
        value,
        operator = TABLE_FILTER_OPERATORS.equals,
        predicate,
      } = filter || {};

      if (isEmptyValue(value) && operator !== TABLE_FILTER_OPERATORS.custom) {
        continue;
      }

      const currentValue = getValue(record, getter || field);

      switch (operator) {
        case TABLE_FILTER_OPERATORS.equals:
          if (currentValue !== value) return false;
          break;
        case TABLE_FILTER_OPERATORS.notEquals:
          if (currentValue === value) return false;
          break;
        case TABLE_FILTER_OPERATORS.in:
          if (!Array.isArray(value) || !value.includes(currentValue)) return false;
          break;
        case TABLE_FILTER_OPERATORS.notIn:
          if (Array.isArray(value) && value.includes(currentValue)) return false;
          break;
        case TABLE_FILTER_OPERATORS.contains:
          if (!normalizeText(currentValue).includes(normalizeText(value))) return false;
          break;
        case TABLE_FILTER_OPERATORS.startsWith:
          if (!normalizeText(currentValue).startsWith(normalizeText(value))) return false;
          break;
        case TABLE_FILTER_OPERATORS.endsWith:
          if (!normalizeText(currentValue).endsWith(normalizeText(value))) return false;
          break;
        case TABLE_FILTER_OPERATORS.gte:
          if (!(currentValue >= value)) return false;
          break;
        case TABLE_FILTER_OPERATORS.lte:
          if (!(currentValue <= value)) return false;
          break;
        case TABLE_FILTER_OPERATORS.gt:
          if (!(currentValue > value)) return false;
          break;
        case TABLE_FILTER_OPERATORS.lt:
          if (!(currentValue < value)) return false;
          break;
        case TABLE_FILTER_OPERATORS.custom:
          if (typeof predicate === "function" && !predicate(record, currentValue)) return false;
          break;
        default:
          break;
      }
    }

    return true;
  });
};

export const mapRecordsToTableRows = (records = [], mapper) => {
  if (typeof mapper !== "function") return records;
  return records.map((record, index) => mapper(record, index));
};

export const tableCellMappers = {
  longText: (value) => String(value ?? ""),

  badge: ({ label, badgeProps = {}, ...rest } = {}) => ({
    label,
    badgeProps,
    ...rest,
  }),

  badges: ({ items = [], maxVisible = 4 } = {}) => ({
    maxVisible,
    items: items.map((item) => {
      if (typeof item === "string") return { label: item };
      return item;
    }),
  }),
};

export default {
  TABLE_FILTER_OPERATORS,
  buildTableQuery,
  applyTableSystemFilters,
  mapRecordsToTableRows,
  tableCellMappers,
};
