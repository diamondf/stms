export type Provider = 'countries' | 'wiki' | undefined;

export const PROVIDER_URLS = {
    countries: 'https://restcountries.eu/rest/v2/lang/en',
    wiki: 'https://commons.wikimedia.org/w/api.php?action=query&list=allimages&ailimit=50&format=json&origin=*'
};

export const PROVIDER_COLUMNS = {
    countries: ['select', 'name', 'region', 'capital', 'subregion'],
    wiki: ['select', 'name', 'title', 'url']
};

