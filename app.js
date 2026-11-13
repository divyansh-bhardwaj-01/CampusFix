import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import session from 'express-session';

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const basepath = process.cwd();
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'campusfix_demo_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
}));


async function connectdb() {

    await client.connect();

    console.log("MongoDB connected");

    const dbname = client.db("college");
    const collection = dbname.collection("students");
    const issuesCollection = dbname.collection("issues");


    app.get("/", (req, res) => {
        res.sendFile("login.html", { root: basepath });
    });


    app.get("/style.css", (req, res) => {
        res.sendFile("style.css", { root: basepath });

    });

    app.post("/login", async (req, res) => {

        const Email = req.body.email;
        const Pass = req.body.password;
        const result = await collection.findOne(
            {
                email: Email,
                password: Pass
            },
            {
                projection: {
                    fullName: 1,
                    email: 1,
                    course: 1,
                    year: 1
                }
            }
        );

        if (result) {
            req.session.studentId = result._id.toString();
            res.redirect('/dashboard');
        }
        else {
            res.redirect('/?error=invalid');
        }
    });


    async function showPage(req, res, page) {
        if (!req.session.studentId) {
            return res.redirect('/');
        }
        const student = await collection.findOne(
            {
                _id: new ObjectId(req.session.studentId)
            },
            {
                projection: {
                    fullName: 1,
                    email: 1,
                    course: 1,
                    year: 1
                }
            }
        );

        if (student) {
            res.render(page, { student: student });
        }
    }

    app.get('/dashboard', async (req, res) => {
        if (!req.session.studentId) {
            return res.redirect('/');

        }
        const student = await collection.findOne(
            {
                _id: new ObjectId(req.session.studentId)
            },

            {
                projection: {
                    fullName: 1,
                    email: 1,
                    course: 1,
                    year: 1
                }
            }

        )
        const issueslength = await issuesCollection.countDocuments();
        const pendinglength = await issuesCollection.countDocuments({
            status: "Pending"
        });

        const electricalCount = await issuesCollection.countDocuments({
            category: "Electrical"
        });

        const wifiCount = await issuesCollection.countDocuments({
            category: "Wi-Fi"
        });

        const waterCount = await issuesCollection.countDocuments({
            category: "Water"
        });

        const cleanlinessCount = await issuesCollection.countDocuments({
            category: "Cleanliness"
        });

        const furnitureCount = await issuesCollection.countDocuments({
            category: "Furniture"
        });

        const otherCount = await issuesCollection.countDocuments({
            category: "Other"
        });

        res.render('index', {
            student,
            issueslength,
            pendinglength,
            electricalCount,
            wifiCount,
            waterCount,
            cleanlinessCount,
            furnitureCount,
            otherCount
        });

    });

    app.get('/report', async (req, res) => {
        await showPage(req, res, 'report');
    });


    app.get('/my-reports', async (req, res) => {
        if (!req.session.studentId) {
            return res.redirect('/');
        }

        const studentId = new ObjectId(req.session.studentId);
        const reports = await issuesCollection.find({ studentId })
            .sort({ createdAt: -1 })
            .toArray();

        const totalReports = reports.length;

        const pendingReports = reports.filter(
            report => report.status === "Pending"
        ).length;


        const student = await collection.findOne(
            { _id: studentId },
            {
                projection: {
                    fullName: 1,
                    email: 1,
                    course: 1,
                    year: 1
                }
            }
        );

        if (!student) {
            return res.redirect('/');
        }

        res.render('my-reports', {
            student,
            reports,
            totalReports,
            pendingReports
        });

    });

    app.get('/profile', async (req, res) => {
        await showPage(req, res, 'profile');

    });

    app.post('/submit-report', async (req, res) => {

        if (!req.session.studentId) {
            return res.redirect('/');
        }

        const category = req.body.category;
        const building = req.body.building;
        const room = req.body.room;
        const title = req.body.title;
        const description = req.body.description;

        const studentId = new ObjectId(req.session.studentId);

        const report = {
            studentId,
            category,
            building,
            room,
            title,
            description,
            status: "Pending",
            createdAt: new Date()
        };

        await issuesCollection.insertOne(report);
        console.log(report);
        res.redirect('/report-success');

    });

    app.get('/report-success', (req, res) => {

        if (!req.session.studentId) {
            return res.redirect('/');
        }
        res.sendFile("success.html", { root: basepath });
    });


    app.post('/logout', (req, res) => {
        req.session.destroy(() => {
            res.sendFile('login.html', { root: basepath });
        });
    });


    app.listen(5300, () => {
        console.log("CampusFix running on port 5300");

    });

}

connectdb();
