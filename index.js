const fs = require('fs');
try{
const data = require(`./${process.argv[2]}`).latlng
const trackName = process.argv[3] || 'track'
const header =
`<?xml version="1.0" encoding="UTF-8" ?>
<gpx version="1.1" creator="Cedric Guerin" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <metadata>
        <time>2013-04-21T20:41:57Z</time>
		<name>${trackName}</name>
        <bounds maxlat="45.112918000" maxlon="5.902569000" minlat="45.103524000" minlon="5.872819000" />
    </metadata>
    <trk>
        <name>${trackName}</name>
		<trkseg>`

const body = data.reduce((res, [lat, lon])=>
`			${res}
			<trkpt lat="${lat}" lon="${lon}">
				<ele>1706.356812</ele>
			</trkpt>`
			, '')

const footer = 
`        </trkseg>
    </trk>
</gpx>`

const gpx = `${header}${body}${footer}`

fs.writeFile(`${trackName}.gpx`, gpx, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
} catch(e) {
	console.log('An error occured, maybe you forgot the input file!', e)
}
