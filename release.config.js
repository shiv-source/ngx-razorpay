/**
 * @type {import('semantic-release').GlobalConfig}
 */

module.exports = {
    branches: ["master"],
    plugins: [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      ["@semantic-release/npm", {
        pkgRoot: './dist/ngx-razorpay'
      }],
      ["@semantic-release/npm", {
        npmPublish: false,
        pkgRoot: 'projects/ngx-razorpay'
      }],
      "@semantic-release/github",
      [
        "@semantic-release/changelog",
        {
          changelogFile: "CHANGELOG.md",
        },
      ],
      [
        "@semantic-release/git",
        {
          assets: ["CHANGELOG.md", "projects/ngx-razorpay/package.json"],
          message:
            "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
        },
      ],
    ],
  };