"use client";

/**
 * EmptyState Molecule
 *
 * A reusable empty state block with title, description, optional illustration,
 * and actions built with Button atom.
 */

import { Button } from "../atoms/button.jsx";

// Import illustrations
import FolderIllustration from "../atoms/illustration/Folder.svg";
import CreateIllustration from "../atoms/illustration/Create.svg";
import NoResultIllustration from "../atoms/illustration/No result.svg";
import ImageIllustration from "../atoms/illustration/Image.svg";
import CommentIllustration from "../atoms/illustration/Comment.svg";
import MessageOpenIllustration from "../atoms/illustration/Message Open.svg";
import MessageClosedIllustration from "../atoms/illustration/Message Closed.svg";
import NoDocSelectedIllustration from "../atoms/illustration/No doc selected.svg";
import WrongIllustration from "../atoms/illustration/Wrong.svg";
import FavoriteIllustration from "../atoms/illustration/Favorite.svg";
import NoRisksIllustration from "../atoms/illustration/Page/No risks.svg";
import NoHealthCheckIllustration from "../atoms/illustration/No health check.svg";
import NoContactIllustration from "../atoms/illustration/No contact.svg";
import NoIssuesIllustration from "../atoms/illustration/No issues.svg";
import MapSearchIllustration from "../atoms/illustration/Map search.svg";
import ComplexIllustration from "../atoms/illustration/Complex.svg";
import SimpleIllustration from "../atoms/illustration/Simple.svg";
import RocketIllustration from "../atoms/illustration/Rocket.svg";
import AssessmentIllustration from "../atoms/illustration/Assessment.svg";
import QuestionIllustration from "../atoms/illustration/Question.svg";
import LoaderIllustration from "../atoms/illustration/Loader.svg";

export const ILLUSTRATION_VARIANTS = {
  folder: "folder",
  create: "create",
  noResult: "noResult",
  image: "image",
  comment: "comment",
  messageOpen: "messageOpen",
  messageClosed: "messageClosed",
  noDocSelected: "noDocSelected",
  wrong: "wrong",
  favorite: "favorite",
  noRisks: "noRisks",
  noHealthCheck: "noHealthCheck",
  noContact: "noContact",
  noIssues: "noIssues",
  mapSearch: "mapSearch",
  complex: "complex",
  simple: "simple",
  rocket: "rocket",
  assessment: "assessment",
  question: "question",
  loader: "loader",
};

const ILLUSTRATION_MAP = {
  folder: FolderIllustration,
  create: CreateIllustration,
  noResult: NoResultIllustration,
  image: ImageIllustration,
  comment: CommentIllustration,
  messageOpen: MessageOpenIllustration,
  messageClosed: MessageClosedIllustration,
  noDocSelected: NoDocSelectedIllustration,
  wrong: WrongIllustration,
  favorite: FavoriteIllustration,
  noRisks: NoRisksIllustration,
  noHealthCheck: NoHealthCheckIllustration,
  noContact: NoContactIllustration,
  noIssues: NoIssuesIllustration,
  mapSearch: MapSearchIllustration,
  complex: ComplexIllustration,
  simple: SimpleIllustration,
  rocket: RocketIllustration,
  assessment: AssessmentIllustration,
  question: QuestionIllustration,
  loader: LoaderIllustration,
};

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

const Illustration = ({ variant = "noResult" }) => {
  const src = ILLUSTRATION_MAP[variant];

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      style={{ width: 80, height: 80, objectFit: "contain", display: "block" }}
    />
  );
};

export const EmptyState = ({
  size = EMPTY_STATE_SIZES.md,
  title = "Title of empty state",
  description = "Text of empty state",
  actionLabel = "Action",
  onAction,
  actionProps,
  actions,
  showActionButton,
  showIllustration = true,
  illustration,
  illustrationVariant = "noResult",
  style,
  ...props
}) => {
  const sizeStyles = styles.sizes[size] || styles.sizes.md;
  const resolvedShowActionButton =
    showActionButton ?? (Array.isArray(actions) ? actions.length > 0 : Boolean(actionLabel));
  const resolvedIllustration =
    typeof illustration === "string"
      ? (
          <img
            src={illustration}
            alt=""
            aria-hidden="true"
            style={{ width: 80, height: 80, objectFit: "contain", display: "block" }}
          />
        )
      : illustration || <Illustration variant={illustrationVariant} />;

  return (
    <div style={{ ...styles.root, ...sizeStyles.root, ...style }} {...props}>
      <div style={{ ...styles.inner, ...sizeStyles.inner }}>
        {showIllustration ? (
          <div style={styles.illustrationWrap}>
            {resolvedIllustration}
          </div>
        ) : null}

        <div style={{ ...styles.content, ...sizeStyles.content }}>
          <div style={{ ...styles.textWrap, ...sizeStyles.textWrap }}>
            <h3 style={{ ...styles.title, ...sizeStyles.title }}>{title}</h3>
            <p style={{ ...styles.description, ...sizeStyles.description }}>{description}</p>
          </div>

          {resolvedShowActionButton ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

EmptyState.displayName = "EmptyState";
EmptyState.sizes = EMPTY_STATE_SIZES;
EmptyState.illustrationVariants = ILLUSTRATION_VARIANTS;
EmptyState.Illustration = Illustration;

export { Illustration };
export default EmptyState;
