
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();

        await client.db('college').command({ ping: 1 });

        return res.status(200).json({
            success: true,
            message: 'MongoDB connection successful from Vercel'
        });

    } catch (error) {
        console.error('MongoDB diagnostic error:', error);

        return res.status(500).json({
            success: false,
            error: error.message,
            code: error.code || null
        });

    } finally {
        await client.close().catch(() => {});
    }
}
