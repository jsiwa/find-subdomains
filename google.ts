import { load } from 'cheerio'

function parseSubdomains(html: string, domain: string) {
  const $ = load(html)
  const subdomains = new Set<string>()

  $('a').each((_, element) => {
    const href = $(element).attr('href')
    if (href) {
      const match = href.match(new RegExp(`https?://([a-z0-9.-]+\\.${domain})`, 'i'));
      if (match && match[1]) {
        subdomains.add(match[1]);
      }
    }
  })

  return Array.from(subdomains)
}

export async function fetchFromGoogle(domain: string) {
  try {
    const html = await fetch(`https://www.google.com/search?q=site:${domain}`).then(res => res.text())
    console.log(`Fetch google successed`)
    return parseSubdomains(html, domain)
  } catch (error) {
    console.error('Error fetching from Google:', error)
    return []
  }
}

// const subdomains = await fetchFromGoogle('example.com')
// console.log(subdomains)