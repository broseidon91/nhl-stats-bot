const Discord = require('discord.js');

module.exports = class Team {

    constructor(teamObj) {
        this.id = teamObj.id;
        this.name = teamObj.name;
        this.link = teamObj.link;
        this.venue = teamObj.venue;
        this.abbr = teamObj.abbreviation;
        this.teamName = teamObj.teamName;
        this.locationName = teamObj.locationName;
        this.firstYear = teamObj.firstYearOfPlay;
        this.division = teamObj.division;
        this.converence = teamObj.converence;
        this.franchise = teamObj.franchise;
        this.shortName = teamObj.shortName;
        this.siteUrl = teamObj.officialSiteUrl;
        this.franchiseId = teamObj.franchiseId;
        this.active = teamObj.active;
    }

    toRichEmbed() {
        let embed = new Discord.RichEmbed()
                  .setTitle(`${this.abbr} | ${this.name}`)
                  .setTimestamp()
                  .addField('Info', `ID: ${this.id}\nFirst Year: ${this.firstYear}`);

        embed.addField('Venue', `${this.venue.name} in ${this.venue.city}\nTimezone: ${this.venue.timeZone.tz}`);
                
        return embed;
    }
}