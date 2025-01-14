/**
 * some utilities for interfacing with npm in the `tap plugin` command
 */

import { LoadedConfig } from '@tapjs/config'
import { foregroundChild } from 'foreground-child'
import { mkdirp } from 'mkdirp'
import { spawnSync } from 'node:child_process'
import { resolve } from 'node:path'

const npmFreeEnv = Object.fromEntries(
  Object.entries(process.env).filter(([k]) => !/^npm_/i.test(k)),
)

let npmCwd: string | undefined = undefined
export const npmFindCwd = async (projectRoot: string): Promise<string> => {
  if (!npmCwd) {
    npmCwd = resolve(projectRoot, '.tap/plugins')
    await mkdirp(npmCwd)
  }
  return npmCwd
}

/**
 * Run an npm command in the background, returning the result
 */
export const npmBg = (args: string[], npmCwd: string) => {
  return spawnSync('npm', ['--prefix', npmCwd, ...args], {
    env: npmFreeEnv,
    encoding: 'utf8',
    cwd: npmCwd,
    shell: true,
  })
}

/**
 * Run an npm command in the foreground
 */
const npmFg = (
  args: string[],
  npmCwd: string,
  cb: (
    code: number | null,
    signal: NodeJS.Signals | null,
  ) =>
    | number
    | false
    | void
    | NodeJS.Signals
    | Promise<number | false | void | NodeJS.Signals | undefined>
    | undefined,
) => {
  return foregroundChild(
    'npm',
    // will always have set npmCwd by now
    /* c8 ignore start */
    ['--prefix', npmCwd, ...args],
    {
      env: npmFreeEnv,
      cwd: npmCwd,
      shell: true,
      /* c8 ignore stop */
    },
    cb,
  )
}

// suppress all non-essential npm output
const quiet = ['--no-audit', '--loglevel=error', '--no-progress']

export const install = async (
  pkgs: string[],
  config: LoadedConfig,
) => {
  const npmCwd = await npmFindCwd(config.projectRoot)
  const args = ['install', ...quiet, '--save-dev', ...pkgs]
  await new Promise<void>((res, rej) => {
    npmFg(args, npmCwd, (code, signal) => {
      // allow error exit to proceed
      if (code || signal) {
        rej(
          Object.assign(new Error('install failed'), {
            code,
            signal,
          }),
        )
        return
      }
      res()
      // do not exit
      return false
    })
  })
}

export const uninstall = async (
  pkgs: string[],
  config: LoadedConfig,
) => {
  const args = ['rm', ...quiet, ...pkgs]
  const npmCwd = await npmFindCwd(config.projectRoot)
  await new Promise<void>(res =>
    npmFg(args, npmCwd, (code, signal) => {
      // allow error exit to proceed
      res()
      return code || signal ? undefined : false
    }),
  )
}
