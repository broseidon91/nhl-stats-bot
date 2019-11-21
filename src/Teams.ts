import * as fs from 'fs';
import { TeamData } from './Team';

export class Teams {
    private data: any;
    private teams = new Map<number, TeamData>();

    public LoadJSON(obj: any) {
        if (!obj.teams)
            return;

        this.data = obj;
        for (let entry of obj.teams) {
            let team = entry as TeamData;
            this.teams.set(team.id, team);
        }
        console.log(this.teams.keys());
    }

    public GetTeam(key: number | string): TeamData {
        console.log(typeof key);
        if (typeof key === 'number') {
            if (this.teams.has(key)) {
                return this.teams.get(key) as TeamData;
            }
        }
        return Array.from(this.teams.values()).filter(
            (team: TeamData) => team.name.toLowerCase().includes((key as string).toLowerCase())
            )[0] as TeamData;
    }


    private SaveData() {
        try {
            fs.writeFile('./data/teams.json', JSON.stringify(this.data), function (err) {
                if (err) {
                    console.log(err);
                } else {
                }
            })

        } catch (err) {
            console.log(err);
        }
    }
}