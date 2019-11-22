import Discord from 'discord.js';
import * as teamStyles from '../data/teamStyles.json';
import { DataRequest } from './DataRequest';

export class TeamMessage {

    public data: TeamData;

    public constructor(data: TeamData) {
        this.data = data;
    }

    public async GetRichEmbed() {

        try {
            var thumb = `http://cdn.nhle.com/nhl/images/logos/teams/${this.data.abbreviation}_logo.svgz`;
            var styles = teamStyles as any;
            console.log('await');
            var stats = await this.GetStats();
            if (stats) {
                
                var current = stats.stats.filter(x => x.type.displayName == "statsSingleSeason").shift();
                if (!current)   
                    return null;
                let embed = new Discord.RichEmbed()
                    .setTitle(`${this.data.abbreviation} - ${this.data.name} ${current.splits[0].stat.wins}-${current.splits[0].stat.losses}-${current.splits[0].stat.ot} (${current.splits[0].stat.pts} pts)`)
                    .setTimestamp()
                    .setColor(+(teamStyles as any)[this.data.teamName].color)
                    .setThumbnail(thumb)
                    .addField('Info', `ID: ${this.data.id}\nFirst Year: ${this.data.firstYearOfPlay}`);

                embed.addField('Venue', `${this.data.venue.name} in ${this.data.venue.city}\nTimezone: ${this.data.venue.timeZone.tz}`);
                return embed;
            }
            else
                return null;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    public GetStats() {
        var path = this.data.link + '/stats';
        try {

            return new DataRequest().Request<TeamStatsData<number>>(path);
        }
        catch (error) {
            return null;
        }
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

export interface TeamStatsData<T extends number | string> {
    stats: [
        {
            type: {
                displayName: string
            }
            splits: [
                {
                    stat: {
                        gamesPlayed: T
                        wins: T
                        losses: T
                        ot: T
                        pts: T
                        ptPctg: string;
                        goalsPerGame: T
                        goalsAgainstPerGame: T
                        evGGARation: T
                        powerPlayPercentage: string;
                        powerPlayGoals: T
                        powerPlayGoalsAgainst: T
                        powerPlayOpportunities: T
                        penaltyKillPercentage: string;
                        shotsPerGame: T;
                        shotsAllowed: T;
                        winScoreFirst: T;
                        winOppScoreFirst: T;
                        winLeadFirstPer: T;
                        winLeadSecondPer: T;
                        winOutshootOpp: T;
                        winOutshotByOpp: T;
                        faceOffsTaken: T;
                        faceOffsWon: T;
                        faceOffsLost: T;
                        faceOffWinPercentage: T;
                        shootingPctg: T;
                        savePctg: T;
                    },
                    team: BaseNHLData;
                }

            ];

        }
    ];

}