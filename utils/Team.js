const Discord = require("discord.js");

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
                  .setTitle(this.name)
                  .setColor(+teamStyles[this.team].color)
                  .setFooter('© esilverm')
                  .setTimestamp()
                  .setThumbnail(teamStyles[this.team].logo)
                  .addField('Player Info', 'Position: ' + this.position)
                  .addBlankField();
    }
}