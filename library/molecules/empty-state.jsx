"use client";

/**
 * EmptyState Molecule
 *
 * A reusable empty state block with title, description, optional illustration,
 * and actions built with Button atom.
 */

import { Button } from "../atoms/button.jsx";

export const EMPTY_STATE_SIZES = {
  md: "md",
  sm: "sm",
};

const styles = {
  root: {
    width: "100%",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
  },
  inner: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  illustrationWrap: {
    width: 80,
    height: 80,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textWrap: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    margin: 0,
    color: "var(--color-content-primary)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-bold)",
    width: "100%",
  },
  description: {
    margin: 0,
    color: "var(--color-content-secondary)",
    fontFamily: "var(--font-family-primary)",
    fontWeight: "var(--font-weight-regular)",
    width: "100%",
  },
  actions: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--spacing-2)",
    flexWrap: "wrap",
  },
  sizes: {
    md: {
      root: {
        padding: "var(--spacing-4)",
      },
      inner: {
        maxWidth: 400,
        gap: "var(--spacing-2)",
      },
      content: {
        gap: "var(--spacing-4)",
      },
      textWrap: {
        gap: "var(--spacing-2)",
      },
      title: {
        fontSize: "var(--text-heading-h5)",
        lineHeight: "var(--line-height-heading-h5)",
      },
      description: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
    },
    sm: {
      root: {
        padding: "var(--spacing-4)",
      },
      inner: {
        maxWidth: 312,
        gap: "var(--spacing-4)",
      },
      content: {
        gap: "var(--spacing-4)",
      },
      textWrap: {
        gap: "var(--spacing-2)",
      },
      title: {
        fontSize: "var(--text-body-lg)",
        lineHeight: "var(--line-height-body-lg)",
        fontWeight: "var(--font-weight-regular)",
      },
      description: {
        fontSize: "var(--text-body-md)",
        lineHeight: "var(--line-height-body-md)",
      },
    },
  },
};

const DefaultIllustration = () => (
  <img
    src={createIllustrationSrc}
    alt=""
    aria-hidden="true"
    style={{ width: 80, height: 80, objectFit: "contain", display: "block" }}
  />
);

export const EmptyState = ({
  size = EMPTY_STATE_SIZES.md,
  title = "Title of empty state",
  description = "Text of empty state",
  actionLabel = "Action",
  onAction,
  actionProps,
  actions,
  showIllustration = true,
  illustration,
  style,
  ...props
}) => {
  const sizeStyles = styles.sizes[size] || styles.sizes.md;

  return (
    <div style={{ ...styles.root, ...sizeStyles.root, ...style }} {...props}>
      <div style={{ ...styles.inner, ...sizeStyles.inner }}>
        {showIllustration ? (
          <div style={styles.illustrationWrap}>
            {illustration || <DefaultIllustration />}
          </div>
        ) : null}

        <div style={{ ...styles.content, ...sizeStyles.content }}>
          <div style={{ ...styles.textWrap, ...sizeStyles.textWrap }}>
            <h3 style={{ ...styles.title, ...sizeStyles.title }}>{title}</h3>
            <p style={{ ...styles.description, ...sizeStyles.description }}>{description}</p>
          </div>

          <div style={styles.actions}>
            {Array.isArray(actions) && actions.length > 0 ? (
              actions
                .filter(Boolean)
                .map((actionNode, index) => (
                  <span key={`empty-state-action-${index}`} style={{ display: "inline-flex" }}>
                    {actionNode}
                  </span>
                ))
            ) : actionLabel ? (
              <Button variant="secondary" size="md" onClick={onAction} {...(actionProps || {})}>
                {actionLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

EmptyState.displayName = "EmptyState";

export default EmptyState;
