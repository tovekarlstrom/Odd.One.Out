import { getDefaultConfig } from 'expo/metro-config';
import path from 'path';

const __dirname = path.resolve();

export default (() => {
  const config = getDefaultConfig(__dirname);
  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: path.resolve(
      __dirname,
      'node_modules/react-native-svg-transformer',
    ),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'cjs'],
  };

  return config;
})();
