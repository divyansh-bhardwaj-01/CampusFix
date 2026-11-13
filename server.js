import app from './app.js';
const PORT = process.env.PORT || 5300;
app.listen(PORT, () => {
    console.log(`CampusFix running on port ${PORT}`);
});