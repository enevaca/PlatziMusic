
const URL = 'https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=a9654bdb0e25ef75a4d90e4b146ec87a&format=json'

function getArtists() {
	return fetch(URL)
		.then(response => response.json())
		.then(data => data.topartists.artist)
		.then(artists => artists.map(artist => {
			return {
				key: artist.mbid,
				name: artist.name,
				image: artist.image[3]['#text'],
				url: artist.url,
				likes: 200,
				comments: 140,
			}
		}))
}

export { getArtists }