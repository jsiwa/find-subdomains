import { fetchFromGoogle } from './google'
import { trySubdomains, generateSubdomains } from './try'

async function discoverSubdomains(domain: string) {
  const results = await Promise.all([
    fetchFromGoogle(domain),
    trySubdomains(generateSubdomains(domain))
  ])

  const subdomains = new Set(results.flat())
  return Array.from(subdomains)
}

const subdomains = await discoverSubdomains('example.com')
console.log(subdomains)