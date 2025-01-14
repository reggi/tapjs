/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/npm.ts > TAP > failing commands > install > must match snapshot 1`] = `
Array [
  Array [
    "npm",
    Array [
      "--prefix",
      "{CWD}/.tap/fixtures/test-npm.ts/.tap/plugins",
      "install",
      "--no-audit",
      "--loglevel=error",
      "--no-progress",
      "--save-dev",
      "a",
      "b",
    ],
    Object {
      "cwd": "{CWD}/.tap/fixtures/test-npm.ts/.tap/plugins",
      "env": Object {
        "ok": true,
      },
      "shell": true,
    },
    Function (code, signal),
  ],
]
`

exports[`test/npm.ts > TAP > failing commands > random command > must match snapshot 1`] = `
Array [
  Array [
    "npm",
    Array [
      "--prefix",
      "{CWD}/.tap/fixtures/test-npm.ts",
      "config",
      "get",
      "registry",
    ],
    Object {
      "cwd": "{CWD}/.tap/fixtures/test-npm.ts",
      "encoding": "utf8",
      "env": Object {
        "ok": true,
      },
      "shell": true,
    },
  ],
]
`

exports[`test/npm.ts > TAP > failing commands > uninstall > must match snapshot 1`] = `
Array [
  Array [
    "npm",
    Array [
      "--prefix",
      "{CWD}/.tap/fixtures/test-npm.ts/.tap/plugins",
      "rm",
      "--no-audit",
      "--loglevel=error",
      "--no-progress",
      "a",
      "b",
    ],
    Object {
      "cwd": "{CWD}/.tap/fixtures/test-npm.ts/.tap/plugins",
      "env": Object {
        "ok": true,
      },
      "shell": true,
    },
    Function (code, signal),
  ],
]
`

exports[`test/npm.ts > TAP > passing commands > install > must match snapshot 1`] = `
Array [
  Array [
    "npm",
    Array [
      "--prefix",
      "{CWD}/.tap/fixtures/test-npm.ts/.tap/plugins",
      "install",
      "--no-audit",
      "--loglevel=error",
      "--no-progress",
      "--save-dev",
      "a",
      "b",
    ],
    Object {
      "cwd": "{CWD}/.tap/fixtures/test-npm.ts/.tap/plugins",
      "env": Object {
        "ok": true,
      },
      "shell": true,
    },
    Function (code, signal),
  ],
]
`

exports[`test/npm.ts > TAP > passing commands > random command > must match snapshot 1`] = `
Array [
  Array [
    "npm",
    Array [
      "--prefix",
      "{CWD}/.tap/fixtures/test-npm.ts",
      "config",
      "get",
      "registry",
    ],
    Object {
      "cwd": "{CWD}/.tap/fixtures/test-npm.ts",
      "encoding": "utf8",
      "env": Object {
        "ok": true,
      },
      "shell": true,
    },
  ],
]
`

exports[`test/npm.ts > TAP > passing commands > uninstall > must match snapshot 1`] = `
Array [
  Array [
    "npm",
    Array [
      "--prefix",
      "{CWD}/.tap/fixtures/test-npm.ts/.tap/plugins",
      "rm",
      "--no-audit",
      "--loglevel=error",
      "--no-progress",
      "a",
      "b",
    ],
    Object {
      "cwd": "{CWD}/.tap/fixtures/test-npm.ts/.tap/plugins",
      "env": Object {
        "ok": true,
      },
      "shell": true,
    },
    Function (code, signal),
  ],
]
`
