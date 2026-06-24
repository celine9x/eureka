Part 1 â€” Update landscape
A user-initiated action to re-run the landscape against the latest data.

User stories:

As a user, I want to trigger an update of my landscape via a button so that it reflects the latest data ingested into the platform.

As a user, I want to see when the landscape was last updated, so I know how fresh the current data is.

Part 2 â€” Change digest
A summary view that lists all changes between the current (updated) landscape and the previous snapshot, with timestamps indicating when each change pertains to.

User stories:

As a user, I want to see a digest of everything that has changed since the last update (e.g. new assets added, assets removed, data field changes) so I can quickly understand the delta without manually scanning the full landscape.

As a user, I want the digest to show timestamps for each change (i.e. when the change was recorded in the source data), so I can distinguish between recently changed and older data.

Part 3 â€” Change flagging in table and side panel
In-context highlighting of assets and specific data values that have changed, surfaced directly in the results table and the asset detail side panel.

User stories:

As a user, I want assets that have changed since the last update to be visually flagged in the results table, so I can find them without having to read the full digest.

As a user, I want to see exactly which data values have changed on a flagged asset within the side panel (e.g. phase moved from Phase 2 to Phase 3, partnering status changed), so I have the context I need at a glance.

As a user, I want to see both the previous and current value for any changed field, so I can understand the nature of the change.
