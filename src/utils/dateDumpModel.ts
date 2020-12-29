import mongoose from 'mongoose';
import { IGroup } from '../group/group.interface';


export default class DateDumpModel {

    static async getAllDates(collectionName: string) {
        const regexCollectionName = new RegExp(`${collectionName}_([0-9]{4}\-[0-9]{2})`);

        const collections = await mongoose.connection.db.listCollections().toArray();
        const dates = [];

        for (const collection of collections) {
            const regexMatches = collection.name.match(regexCollectionName);

            if (regexMatches) {
                dates.push(regexMatches[1]);
            }
        }

        return dates;
    }

    static getModelByDate(originalModel: mongoose.Model<IGroup & mongoose.Document>, date: string) {
        return mongoose.model<IGroup & mongoose.Document>(
            `${originalModel.collection.collectionName}_${date}`,
            originalModel.schema
        );
    }

}