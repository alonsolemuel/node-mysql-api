import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const router = express.Router();
const swaggerDocument = YAML.load(path.join(__dirname, '..', 'swagger.yaml'));

// load the Swagger UI files from a CDN so the docs page also works on Vercel
const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14';
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customSiteTitle: 'Node MySQL Auth API - Docs',
    customCssUrl: `${CDN}/swagger-ui.min.css`,
    customJs: [`${CDN}/swagger-ui-bundle.min.js`, `${CDN}/swagger-ui-standalone-preset.min.js`]
}));

export default router;
