require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const commentRoutes = require('./routes/commentRoutes');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // If using YAML
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));