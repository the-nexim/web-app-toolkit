import {mkdir, cp} from 'fs/promises';
import {dirname, join} from 'path';

import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

const logger = createLogger(__package_name__);

export async function copyFont(fontName: string, outputDirectory: string): Promise<void> {
  logger.logMethodArgs?.('copyFont', {fontName, outputDir: outputDirectory});

  const resolvedOutputDirectory = join(outputDirectory, fontName);
  await mkdir(resolvedOutputDirectory, {recursive: true});

  // Generate npm package font path directory
  let fontPath = require.resolve('@alwatr/font');
  fontPath = dirname(fontPath);
  fontPath = join(fontPath, fontName);

  await cp(fontPath, resolvedOutputDirectory, {recursive: true, preserveTimestamps: true, force: true});

  logger.logStep?.('copyFont', 'copy-font', {resolvedOutputDirectory});
}
