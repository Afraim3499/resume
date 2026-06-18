import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { generatePriceIndexData } from './generate-price-index-data';

const ROOT = process.cwd();

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function stable(value: unknown): string {
  return JSON.stringify(value);
}

const generated = generatePriceIndexData(false);
const matrixPath = join(ROOT, 'src', 'data', 'purchasing-power', 'generated', 'price-index-matrix.json');
const routesPath = join(ROOT, 'src', 'data', 'purchasing-power', 'generated', 'routes.json');
const currentMatrix = readJson(matrixPath);
const currentRoutes = readJson(routesPath);

if (stable(currentMatrix) !== stable(generated.matrix)) {
  throw new Error('Generated price-index-matrix.json is out of date. Run npm run generate:data.');
}

if (stable(currentRoutes) !== stable(generated.routeManifest)) {
  throw new Error('Generated routes.json is out of date. Run npm run generate:data.');
}

console.log('Price index data validation passed.');
