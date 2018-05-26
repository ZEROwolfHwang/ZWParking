/**
 *
 * Created by zerowolf on 2017/11/14.
 */
import Realm from 'realm';
import {UserSchema} from "./schema_user";
import {CardSchema} from "./schema_card";
import {HabitSchema} from "./schema_cusHabit";

// export const MySchemas = [UserSchema, CardSchema];

export default new Realm({
    schemaVersion: 15,
    schema: [UserSchema, CardSchema,HabitSchema],
    // path:'/Users/zerowolf/Desktop/realmDB/myModel.realm',
});

