import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
    userId: string;
    projectId: string;
    action: string;
    payload: any;
    timestamp: Date;
}

const ActivityLogSchema: Schema = new Schema({
    userId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    action: { type: String, required: true },
    payload: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
