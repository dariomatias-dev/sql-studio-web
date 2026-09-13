import baseConfig from "./commitlint.config.mjs";

// Used only by the commit-lint CI job, against the PR title - never by the
// local commit-msg hook, which keeps commitlint.config.mjs's defaults.
//
// commitlint's default ignores treat any "Merge ..."-shaped subject as
// exempt, because that's what git itself writes for a real merge commit.
// A PR title is typed by a person, so nothing generates that shape there
// except a human choosing not to follow the convention - defaultIgnores
// would let that through unchecked. The one legitimate exception is
// GitHub's Revert button, which opens a PR titled `Revert "..."`.
const config = {
  ...baseConfig,
  defaultIgnores: false,
  ignores: [(message) => /^Revert /.test(message)],
};

export default config;
