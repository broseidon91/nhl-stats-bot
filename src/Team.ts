
import Discord from 'discord.js';
import * as teamStyles from '../data/teamStyles.json';

export class TeamMessage {

    public data: TeamData;
    
    public constructor(data: TeamData) {
        this.data = data;
    }

    public GetMessage() {

        var thumb = `http://cdn.nhle.com/nhl/images/logos/teams/${this.data.abbreviation}_logo.svgz`;
        console.log(thumb);
        var styles = teamStyles as any;

        let embed = new Discord.RichEmbed()
            .setTitle(`${this.data.abbreviation} - ${this.data.name}`)
            .setTimestamp()
            .setColor(+(teamStyles as any)[this.data.teamName].color)
            .setThumbnail(thumb)
            .addField('Info', `ID: ${this.data.id}\nFirst Year: ${this.data.firstYearOfPlay}`);

        embed.addField('Venue', `${this.data.venue.name} in ${this.data.venue.city}\nTimezone: ${this.data.venue.timeZone.tz}`);

        return embed;
    }

}

///Defines an interface that describes the shape of JSON data gotten 
//from `GET https://statsapi.web.nhl.com/api/v1/teams/ID` 
export interface TeamData extends BaseNHLData {

    venue: {
        id: number;
        name: string;
        link: string;
        city: string;
        timeZone: {
            id: string;
            offset: number;
            tz: string;
        }
    }
    abbreviation: string,
    teamName: string,
    locationName: string,
    firstYearOfPlay: string,
    division: {
        id: number;
        name: string;
        nameShort: string;
        link: string;
        abbreviation: string;
    };

    conference: {
        id: number;
        name: string;
        link: string;
    };
    franchise: {
        franchiseId: number;
        teamName: string;
        link: string;
    };
    shortName: string;
    officialSiteUrl: string;
    franchiseId: number;
    active: boolean;
}

export interface BaseNHLData {
    id: number;
    name: string;
    link: string;
}