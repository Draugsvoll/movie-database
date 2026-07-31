/**
 * Runs vue-cli-service with Node-version-aware flags.
 * - Node 17+: enables OpenSSL legacy provider (webpack 4)
 * - All versions: applies http_parser patch first
 */
const { spawn } = require('child_process')
const path = require('path')

// Apply websocket-driver patch
require('./patch-http-parser')

const major = parseInt(process.versions.node.split('.')[0], 10)
const args = process.argv.slice(2) // e.g. ['serve'] or ['build']

const env = { ...process.env }

// webpack 4 + OpenSSL 3 (Node 17+) needs legacy provider
if (major >= 17) {
  const existing = env.NODE_OPTIONS || ''
  if (!existing.includes('openssl-legacy-provider')) {
    env.NODE_OPTIONS = `${existing} --openssl-legacy-provider`.trim()
  }
}

const vueCli = path.join(
  __dirname,
  '..',
  'node_modules',
  '@vue',
  'cli-service',
  'bin',
  'vue-cli-service.js'
)

const child = spawn(process.execPath, [vueCli, ...args], {
  env,
  stdio: 'inherit',
  shell: false
})

child.on('exit', (code) => process.exit(code == null ? 1 : code))
child.on('error', (err) => {
  console.error(err)
  process.exit(1)
})
