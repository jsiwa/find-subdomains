import dns from 'node:dns'
import util from 'node:util'

const resolve = util.promisify(dns.resolve)

export async function trySubdomains(subdomains: string[]) {
  const foundSubdomains: string[] = []
  for (const sub of subdomains) {
    try {
      await resolve(sub)
      foundSubdomains.push(sub)
      console.log(`Found: ${sub}`)
    } catch {
      console.log(`Not found: ${sub}`)
    }
  }
  return foundSubdomains
}

// @see more https://github.com/danielmiessler/SecLists/tree/master/Discovery/DNS
export function generateSubdomains(domain: string) {
  const baseSubdomains = ['www', 'mail', 'ftp', 'admin', 'news']

  const prefixes = ['dev', 'test', 'stage', 'prod', 'api', 'blog', 'shop']
  const suffixes = ['01', '02', 'internal', 'external', 'backup']

  const subdomains: string[] = []

  baseSubdomains.forEach(sub => {
    subdomains.push(`${sub}.${domain}`)
  })

  prefixes.forEach(prefix => {
    subdomains.push(`${prefix}.${domain}`)
  })

  suffixes.forEach(suffix => {
    subdomains.push(`${suffix}.${domain}`)
  })

  return subdomains
}

// const subdomains = await trySubdomains(generateSubdomains('example.com'))
// console.log(subdomains)